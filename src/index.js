const express = require("express");
require("./db/mongoose.js");
const User = require("./models/user");
const Task = require("./models/task.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send();
  }
});

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
});

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(201).send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

// app.get("/tasks/:id", (req, res) => {
//   const _id = req.params.id;

//   try {

//   } catch (err) {

//   }

//   Task.findById(_id)
//     .then((task) => {
//       if (!task) return res.status(404).send();
//       res.send(task);
//     })
//     .catch((err) => {
//       res.status(500).send();
//     });
// });

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
