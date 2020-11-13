const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = process.env;
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

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

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Gil",
  email: "gil@example.com",
  password: "66what??",
  age: 29,
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, TOKEN_SECRET),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First test task",
  completed: false,
  author: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second test task",
  completed: true,
  author: userTwo._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third test task",
  completed: false,
  author: userTwo._id,
};

const setUpDataBase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo);
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  setUpDataBase,
};
