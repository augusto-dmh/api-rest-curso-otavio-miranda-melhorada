import multer from "multer";
import multerConfig from "../config/multer";
import * as errors from "../validation/errors/controllers";
import ApiError from "../validation/errors/classes/ApiError";

export default (req, res, next) => {
  const upload = multer(multerConfig).single("photo");

  upload(req, res, (err) => {
    if (!err) return next();

    const source = {
      function: "upload",
      file: "src/middlewares/uploadPhoto",
      line: 8,
    };

    switch (err.code) {
      case "LIMIT_INVALID_TYPE":
        next({ err: new ApiError(...errors.invalidPhotoType), source });
        break;

      case "LIMIT_FILE_SIZE":
        next({ err: new ApiError(...errors.invalidPhotoSize), source });
        break;

      default:
        next({ err: new ApiError(...errors.internalServerError), source });
    }
  });
};
