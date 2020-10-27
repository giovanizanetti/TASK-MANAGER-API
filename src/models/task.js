const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("task", {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: String,
    default: false,
  },
});
module.exports = Task;
