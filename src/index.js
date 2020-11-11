const express = require("express");
const router = require("./routers");
require("./db/mongoose.js");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
