const Task = require("../models/task");

const createTask = async (req, res) => {
  const task = new Task({
    ...req.body,
    author: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const readTasks = async (req, res) => {
  const { completed, limit, skip, sortBy } = req.query;

  const author = req.user._id;
  const options = { author };
  const completedQuery = completed;
  const limitQuery = parseInt(limit);
  const skipQuery = parseInt(skip);
  const sortQuery = {};

  // in case completed query is provideded, populate the options obj wich is  passed into find Task.
  if (completedQuery === "false") options.completed = false;
  if (completedQuery === "true") options.completed = true;
  //

  // In case sortQuery is provided, populate the object passed into sort method.
  if (sortBy) {
    const parts = sortBy.split(":");
    sortQuery[parts[0]] = parts[1];
  }
  //

  try {
    const tasks = await Task.find(options)
      .limit(limitQuery)
      .skip(skipQuery)
      .sort(sortQuery);
    res.status(201).send(tasks);
  } catch (err) {
    res.status(500).send();
  }
};

const getSingleTask = async (req, res) => {
  const _id = req.params.id;
  const author = req.user._id;

  try {
    const task = await Task.findOne({ _id, author });

    if (!task) return res.status(404).send();
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
};

const updateTask = async (req, res) => {
  const _id = req.params.id;
  const author = req.user._id;
  const newData = req.body;
  const updates = Object.keys(newData);
  const saveOptions = { validateModifiedOnly: true };

  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid update!" });

  try {
    const task = await Task.findOne({ _id, author });

    if (!task) return res.status(404).send();
    res.send(task);

    updates.forEach((update) => (task[update] = newData[update]));
    await task.save(saveOptions);
  } catch (err) {
    res.status(400).send(err);
  }
};

const removeTask = async (req, res) => {
  const _id = req.params.id;
  const author = req.user._id;

  try {
    const task = await Task.findOneAndDelete({ _id, author });
    if (!task) return res.status(404).send({ error: "Task not found!" });
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const removeAllTasks = async (req, res) => {
  const author = req.user._id;

  try {
    const tasks = await Task.deleteMany({ author });
    res.status(201).send(tasks);
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = {
  createTask,
  readTasks,
  getSingleTask,
  updateTask,
  removeTask,
  removeAllTasks,
};
