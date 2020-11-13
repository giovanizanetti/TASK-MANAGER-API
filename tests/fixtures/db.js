const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = process.env;
const User = require("../../src/models/user");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "mike@example.com",
  password: "56what!!",
  age: 33,
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, TOKEN_SECRET),
    },
  ],
};

const setUpDataBase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOneId,
  userOne,
  setUpDataBase,
};
