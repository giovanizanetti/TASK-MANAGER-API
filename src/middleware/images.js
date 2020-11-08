const multer = require("multer");

const avatar = multer({
  dest: "avatars/",
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

const avatarError = (err, req, res, next) =>
  res.status(400).send({ error: err.message });

// const upload = multer({
//   dest: "images",
//   limits: {
//     fileSize: 1000000, //1MB
//   },
//   fileFilter(req, file, cb) {
//     // Match Word files
//     if (!file.originalname.match(/\.(doc|docx)$/)) {
//       return cb(new Error("File must be a Word document"));
//     }

//     cb(undefined, true);
//   },
// });

module.exports = {
  avatar,
  avatarError,
};
