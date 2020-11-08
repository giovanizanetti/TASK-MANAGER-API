const { Logger } = require("mongodb");
const multer = require("multer");

const avatar = multer({
  limits: {
    fileSize: 1000000, //1MB
  },
  fileFilter(req, file, cb) {
    const imageType = /\.(jpg|jpeg|png)$/;

    if (!file.originalname.match(imageType)) {
      return cb(new Error("Please upload an image of format jpg, jpeg or png"));
    }

    cb(undefined, true);
  },
}).single("avatar");

const fields = [{ name: "files", maxCount: 10 }];

const taskFiles = multer({
  // dest: "uploads/",
  limits: {
    fileSize: 3000000, //3MB
  },
  // fileFilter(req, files, cb) {
  //   // const fileTypes = /\.(jpg|jpeg|png|pdf)$/;
  //   // // console.log(file);
  //   // if (!file.originalname.match(fileTypes)) {
  //   //   return cb(new Error("Please upload an image of format jpg, jpeg or png"));
  //   // }
  //   // console.log("files: ", files);
  //   // if (!files.) {
  //   //   return cb(new Error("Please select a file."));
  //   // }

  //   cb(undefined, true);
  //   // console.log("files: ", files);
  // },
}).array("files", 10);
// single("avatar");

module.exports = {
  avatar,
  taskFiles,
};
