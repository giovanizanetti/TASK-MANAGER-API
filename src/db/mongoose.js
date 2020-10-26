const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// me.save()
//   .then(() => console.log(me))
//   .catch((err) => console.log("Error: " + err));

// const Task = mongoose.model("task", {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });
// const task = new Task({
//   description: "Go to the gin  ",
// });

// task
//   .save()
//   .then(() => console.log(task))
//   .catch((err) => console.log("Error: " + err));
