const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  signup,
  login,
  userProfile,
  getSingleUser,
  updateUser,
  removeUser,
} = require("./user");
const {
  createTask,
  readTasks,
  getSingleTask,
  updateTask,
  removeTask,
} = require("./task");

router.post("/users/signup", signup);
router.post("/users/login", login);
router.get("/users/me", auth, userProfile);
router.get("/users/:id", auth, getSingleUser);
router.patch("/users/:id", auth, updateUser);
router.delete("/users/:id", auth, removeUser);

router.post("/tasks", auth, createTask);
router.get("/tasks", auth, readTasks);
router.get("/tasks/:id", auth, getSingleTask);
router.patch("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, removeTask);

module.exports = router;
