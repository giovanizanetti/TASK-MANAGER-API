const Task = require("../models/task");

const createTask = async (req, res) => {
  const task = new Task(req.body);

  try {
    task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const readTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(201).send(tasks);
  } catch (err) {
    res.status(500).send();
  }
};

const getSingleTask = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
};

const updateTask = async (req, res) => {
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
    if (!isValidOperation)
      return res.status(400).send({ error: "Invalid update!" });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const removeTask = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) return res.status(404).send({ error: "Task not found!" });
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  createTask,
  readTasks,
  getSingleTask,
  updateTask,
  removeTask,
};
