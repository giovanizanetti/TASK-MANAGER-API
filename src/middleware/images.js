const multer = require("multer");

const uploadAvatar = multer({
  dest: "avatars/",
  limits: {
    fileSize: 1000000, //1MB
  },
  fileFilter(req, file, cb) {
    const imageType = /\.(jpg|jpeg|png)$/;

    if (!file.originalname.match(imageType)) {
      return cb(new Error("Image type must be jpg, jpeg or png"));
    }

    cb(undefined, true);
  },
});

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
  uploadAvatar,
};
