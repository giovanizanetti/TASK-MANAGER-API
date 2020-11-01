const express = require("express");
const router = require("./routers");
require("./db/mongoose.js");

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("Get request are disable");
//   }
//   console.log(req.method, req.path);
//   console.log("Middleware running");
//   next();
// });

// app.use((req, res, next) => {
//   res
//     .status(503)
//     .send(
//       "Sorry! This site is temporarily unavailable. Please, try again later."
//     );
// });

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const myFunc = async () => {
  //   const password = "banana123";
  //   const hasPas = await bcrypt.hash(password, 8);
  //   console.log(password);
  //   console.log(hasPas);
  //   const isMatch = await bcrypt.compare("banana123", hasPas);
  //   console.log(isMatch);
  // const token = jwt.sign(
  //   { _id: "banana123" },
  //   "e747474hghdhdhdhdhdhdhdhdh3eeyeyeyey",
  //   {
  //     expiresIn: "7m",
  //   }
  // );
  // console.log(token);
  // const data = jwt.verify(token, "e747474hghdhdhdhdhdhdhdhdh3eeyeyeyey");
  // console.log(data);
};

myFunc();
