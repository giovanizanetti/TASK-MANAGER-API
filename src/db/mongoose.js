const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("user", {
  name: {
    type: String,
    required: true,
    trim: true,
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
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value))
        throw new Error("Email must be a valid email");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      const word = "password";
      if (value.includes("password"))
        throw new Error(`Password can not contain the word ${word}`);
    },
  },
});

const me = new User({
  name: "Paulo    ",
  age: 1,
  email: "Palo@gmail.com",
  password: "bnanansns",
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
