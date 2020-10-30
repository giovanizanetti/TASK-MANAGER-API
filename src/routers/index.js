const express = require("express");
const router = express.Router();
const {
  readUsers,
  createUser,
  getSingleUser,
  updateUser,
  removeUser,
} = require("./user");

router.post("/users", createUser);
router.get("/users", readUsers);
router.get("/users/:id", getSingleUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", removeUser);

module.exports = router;
