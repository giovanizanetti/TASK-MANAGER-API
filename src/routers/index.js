const express = require("express");
const router = express.Router();
const { uploadAvatar } = require("../middleware/images");
const auth = require("../middleware/auth");

const {
  signup,
  login,
  userProfile,
  avatarUpload,
  logout,
  logoutAll,
  updateUser,
  removeUser,
} = require("./user");

const {
  createTask,
  readTasks,
  getSingleTask,
  updateTask,
  removeTask,
  removeAllTasks,
} = require("./task");

// User Routers
router.post("/users/signup", signup);
router.post("/users/login", login);
router.get("/users/me", auth, userProfile);
router.post("/users/me/avatar", uploadAvatar.single("avatar"), avatarUpload);
router.post("/users/logout", auth, logout);
router.post("/users/logoutAll", auth, logoutAll);
router.patch("/users/me", auth, updateUser);
router.delete("/users/me", auth, removeUser);

// Task routers
router.post("/tasks", auth, createTask);
router.get("/tasks", auth, readTasks);
router.get("/tasks/:id", auth, getSingleTask);
router.patch("/tasks/:id", auth, updateTask);
router.delete("/tasks/:id", auth, removeTask);
router.delete("/tasks", auth, removeAllTasks);

module.exports = router;
