const express = require("express");
const router = require("./routers");
require("./db/mongoose.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

// const bcrypt = require("bcryptjs");

// const myFunc = async () => {
//   const password = "banana123";
//   const hasPas = await bcrypt.hash(password, 8);

//   console.log(password);
//   console.log(hasPas);

//   const isMatch = await bcrypt.compare("banana123", hasPas);
//   console.log(isMatch);
// };

// myFunc();
