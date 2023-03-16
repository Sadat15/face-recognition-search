const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "$2b$10$kgR0zqFKYlWCiVzidmzmL.YFqJ.KSnwjC.HKeMozj.HYnXGYtvHJ2",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "$2b$10$LfiJgAmtNL8MP5YecqpVHuYjNpcGviusgiWMUuMWWlrZ5nI2IFcmW",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "125",
      name: "Hamza",
      email: "hamza@gmail.com",
      password: "$2b$10$Nw7rROoBLYPA5D7WgzZHT.Gld/Sd8oxlLswsvGE8XMmaMlHC7HLwG",
      entries: 0,
      joined: "2023-03-15T15:46:49.196Z",
    },
  ],
};

const hashPassword = async (input) => {
  try {
    const hashedPassword = await bcrypt.hash(input, 10);
    return hashedPassword;
  } catch (error) {
    console.error(error);
  }
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  let foundUser;

  for (const user of database.users) {
    if (user.email === email) {
      foundUser = user;
    }
  }

  if (!foundUser) {
    return res.status(401).json({
      message: "Email or Password is incorrect, please try again",
    });
  }

  const checked = await bcrypt.compare(password, foundUser.password);
  if (checked === false) {
    return res.status(401).json({
      message: "Email or Password is incorrect, please try again",
    });
  }

  const token = jwt.sign({ id: foundUser.id }, "secret");
  return res.json({ token, userId: foundUser.id });
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  for (const user of database.users) {
    if (email === user.email) {
      return res.json({ message: "User already exists!" });
    }
  }

  async function createUser() {
    try {
      const hashedPassword = await hashPassword(password);
      database.users.push({
        id: "125",
        name,
        email,
        password: hashedPassword,
        entries: 0,
        joined: new Date(),
      });
      res.json(database.users[database.users.length - 1]);
    } catch (error) {
      console.error(error);
    }
  }

  createUser();
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    return res.status(404).json("no such user");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      user.entries++;
      found = true;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

app.listen(8080, () => {
  console.log("app is running on port 8080");
});
