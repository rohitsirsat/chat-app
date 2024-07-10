import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },

  filename: function (req, file, cb) {
    let fileExtension = "";
    if (file.originalname.split(".").length > 1) {
      fileExtension = file.originalname.substring(
        file.originalname.lastIndexOf(".")
      );
    }

    const filenameWithoutExtention = file.originalname
      .toLocaleLowerCase()
      .split(" ")
      .join("-")
      ?.split(".")[0];
    cb(
      null,
      filenameWithoutExtention +
        Date.now() +
        Math.ceil(Math.random() * 1e5) + // avoid rare name conflict
        fileExtension
    );
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1000 * 1000,
  },
});
