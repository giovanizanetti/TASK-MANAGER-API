const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { TOKEN_SECRET } = process.env;

const auth = async (req, res, next) => {
  try {
    token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, TOKEN_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
