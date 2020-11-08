const User = require("../models/user");

const signup = async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send("Unable to login.");
  }
};

const userProfile = async (req, res) => {
  res.send(req.user);
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.send();
  } catch (err) {
    res.status(500).send();
  }
};

const avatarUpload = (req, res) => {
  try {
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send;
  }
};

const updateUser = async (req, res) => {
  const newData = req.body;
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
    const { user } = req;

    updates.forEach((update) => (user[update] = newData[update]));
    await user.save(saveOptions);

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const removeUser = async (req, res) => {
  try {
    const user = req.user;
    await user.remove();
    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = {
  signup,
  login,
  userProfile,
  avatarUpload,
  logout,
  logoutAll,
  updateUser,
  removeUser,
};
