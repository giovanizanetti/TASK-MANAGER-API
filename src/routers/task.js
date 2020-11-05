const Task = require("../models/task");

const createTask = async (req, res) => {
  const task = new Task({
    ...req.body,
    author: req.user._id,
  });

  try {
    task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const readTasks = async (req, res) => {
  const author = req.user._id;

  try {
    const tasks = await Task.find({ author });
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
    // const task = await Task.findByIdAndDelete(_id);
    // console.log(author);
    // console.log(req);
    // console.log("bsbsbsb");
    const task = await Task.findOneAndDelete({ _id, author });
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
