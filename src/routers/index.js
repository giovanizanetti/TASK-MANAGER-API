const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const {
  readUsers,
  createUser,
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

router.post("/users", createUser);
router.get("/users", readUsers);
router.get("/users/:id", getSingleUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", removeUser);

router.post("/tasks", createTask);
router.get("/tasks", readTasks);
router.get("/tasks/:id", getSingleTask);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", removeTask);

module.exports = router;
