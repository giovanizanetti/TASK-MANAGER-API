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

app.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const newData = req.body;
  const options = { new: true, runValidators: true, useFindAndModify: false };
  const updates = Object.keys(newData);
  const allowedUpdates = ["name", "password", "email", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  try {
    const user = await User.findByIdAndUpdate(_id, newData, options);

    if (!isValidOperation) {
      return res.status(400).send({
        error: "Invalid update!",
      });
    }
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
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

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const newData = req.body;
  const updates = Object.keys(newData);
  const options = { new: true, runValidators: true, useFindAndModify: false };
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  try {
    const task = await Task.findByIdAndUpdate(_id, newData, options);
    if (!isValidOperation) res.status(400).send({ error: "Invalid update!" });
    if (!task) res.status(404).send();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
