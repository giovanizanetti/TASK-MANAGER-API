const express = require("express");
const router = require("./routers");
require("./db/mongoose.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

const User = require("../src/models/user");
const Task = require("../src/models/task");

const main = async () => {
  // const task = await Task.findById("5fa1b89ba894f623afea1f18");
  // await task.populate("author").execPopulate();
  // console.log(task.author);
  const user = await User.findById("5fa1b8339b4c6f236fb71424");
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};

// main();
