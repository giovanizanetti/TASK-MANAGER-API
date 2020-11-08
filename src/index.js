const express = require("express");
const router = require("./routers");
require("./db/mongoose.js");

const app = express();
const port = process.env.PORT || 3000;

const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000, //1MB
  },
  fileFilter(req, file, cb) {
    // Match word files
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("File must be a Word document"));
    }

    cb(undefined, true);
  },
});

app.post("/upload", upload.single("upload"), (req, res) => {
  console.log("requesteddddddd");
  res.send();
});

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
