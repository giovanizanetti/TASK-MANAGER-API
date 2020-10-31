const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
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
      if (value.toLowerCase().includes("password"))
        throw new Error(`Password can not contain the word ${word}`);
    },
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
