const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("user", {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) throw new Error("Age must be a valid age ");
    },
  },
  email: {
    type: String,
    required: true,
  },
});

const me = new User({
  name: "Gio",
  age: -1,
  email: "lindinha@lindinha.com",
});

me.save()
  .then(() => console.log(me))
  .catch((err) => console.log("Error: " + err));

const Task = mongoose.model("task", {
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
});

const task = new Task({
  description: "Go shopping",
  completed: false,
});

task
  .save()
  .then(() => console.log(task))
  .catch((err) => console.log("Error: " + err));
