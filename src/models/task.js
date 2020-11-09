const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
      required: true,
    },
    completed: {
      type: String,
      default: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    files: [{ type: Buffer }],
  },
  { timestamps: true }
);

taskSchema.methods.toJSON = function () {
  const task = this;
  const taskObj = task.toObject();

  delete taskObj.files;

  return taskObj;
};

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
