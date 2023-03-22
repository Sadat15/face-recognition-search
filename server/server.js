const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Success");
});

app.post("/signin", async (req, res) => {
  try {
    const [userLogin] = await knex
      .select("email", "hash")
      .from("login")
      .where("email", "=", req.body.email);

    if (!userLogin) {
      return res
        .status(400)
        .json("Username or password is incorrect. Please try again.");
    }

    const isValid = await bcrypt.compare(req.body.password, userLogin.hash);

    if (isValid) {
      const [{ id, name, _, entries }] = await knex
        .select("*")
        .from("users")
        .where("email", "=", req.body.email);
      const token = jwt.sign({ id }, "secret");

      return res.json({
        token,
        userId: id,
        info: { name, entries },
      });
    } else {
      res.status(400).json("Username or password is incorrect");
    }
  } catch (error) {
    console.error({ message: error });
  }
});

app.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  try {
    const user = await knex.transaction(async (trx) => {
      const [loginEmail] = await trx("login")
        .insert({ hash, email })
        .returning("email");

      const [newUser] = await trx("users")
        .insert({
          email: loginEmail.email,
          name,
          joined: new Date(),
        })
        .returning("*");

      return newUser;
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json("unable to register");
  }
});

app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await knex.select("*").from("users").where({ id });
    if (user.length) {
      res.json(user[0]);
    } else {
      res.status(400).json({ message: "error getting user" });
    }
  } catch (error) {
    console.error(error);
    res.json("Not found");
  }
});

app.put("/image", async (req, res) => {
  const { id } = req.body;

  try {
    const entries = await knex("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries");
    res.json(entries[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "unable to get entries" });
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
