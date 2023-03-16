const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "125",
      name: "John",
      email: "john@gmail.com",
      password: "$2b$10$kgR0zqFKYlWCiVzidmzmL.YFqJ.KSnwjC.HKeMozj.HYnXGYtvHJ2",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "125",
      name: "Sally",
      email: "sally@gmail.com",
      password: "$2b$10$LfiJgAmtNL8MP5YecqpVHuYjNpcGviusgiWMUuMWWlrZ5nI2IFcmW",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "126",
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

const passwordCheck = async (input, hash) => {
  try {
    const check = await bcrypt.compare(input, hash);
    return check;
  } catch (error) {
    console.error(error);
  }
};

// async function checkUser(paramPassword, dbPassword) {
//   try {
//     const checked = await passwordCheck(paramPassword, dbPassword);
//     if (checked) {
//       return res.json("success");
//     } else {
//       res.json("unsuccesful");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  let foundUser = false;

  for (const user of database.users) {
    if (user.email === email) {
      async function checkUser() {
        try {
          const checked = await passwordCheck(password, user.password);
          if (checked) {
            foundUser = true;
            return res.status(200).json("success");
          } else {
            res
              .status(401)
              .json("Username or password is incorrect, please try again");
          }
        } catch (error) {
          console.error(error);
        }
      }
      checkUser();
      return;
    }
  }

  if (!foundUser) {
    res.status(401).json("Username or password is incorrect, please try again");
  }
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
