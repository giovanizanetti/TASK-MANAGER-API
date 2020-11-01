const jwt = require("jsonwebtoken");
const { findById, findByIdAndDelete } = require("../models/user");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, "blajdjdjdj");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "unable to login" });
  }
};

module.exports = auth;
