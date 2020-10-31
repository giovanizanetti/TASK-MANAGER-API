const User = require("../models/user");

const readUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send();
  }
};

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getSingleUser = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
};

const updateUser = async (req, res) => {
  const _id = req.params.id;
  const newData = req.body;
  // const options = { new: true, runValidators: true, useFindAndModify: false };
  const saveOptions = { validateModifiedOnly: true };
  const updates = Object.keys(newData);
  const allowedUpdates = ["name", "password", "email", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates!",
    });
  }

  try {
    // const user = await User.findByIdAndUpdate(_id, newData, options);
    const user = await User.findById(_id);

    updates.forEach((update) => (user[update] = newData[update]));
    await user.save(saveOptions);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const removeUser = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }
    res.send(user);
  } catch (err) {}
};

module.exports = {
  readUsers,
  createUser,
  getSingleUser,
  updateUser,
  removeUser,
};
