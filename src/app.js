const express = require("express");
const router = require("./routers");
require("./db/mongoose.js");

const app = express();

app.use(express.json());
app.use(router);

module.exports = app;
