import multer from "multer";
import multerConfig from "../config/multer";
import * as errors from "../validation/errors/controllers";

export default (req, res, next) => {
  const upload = multer(multerConfig).single("photo");

  upload(req, res, (err) => {
    if (!err) return next();

    switch (err.code) {
      case "LIMIT_INVALID_TYPE":
        next(errors.invalidPhotoType);
        break;

      case "LIMIT_FILE_SIZE":
        next(errors.invalidPhotoSize);
        break;

      default:
        next(errors.internalServerError);
    }
  });
};
