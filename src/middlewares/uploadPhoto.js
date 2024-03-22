import multer from "multer";
import multerConfig from "../config/multer";
import * as errors from "../validation/errors/controllers";
import ApiError from "../validation/errors/classes/ApiError";
import stacktrace from "stack-trace";

export default (req, res, next) => {
  const upload = multer(multerConfig).single("photo");

  upload(req, res, (err) => {
    if (!err) return next();
    const fullPath = req.baseUrl + req.path;
    const trace = stacktrace.parse(err);

    switch (err.code) {
      case "LIMIT_INVALID_TYPE":
        next({ err: new ApiError(...errors.createInvalidPhotoType()), trace });
        break;

      case "LIMIT_FILE_SIZE":
        next({ err: new ApiError(...errors.createInvalidPhotoSize(fullPath)), trace });
        break;

      default:
        next({ err: new ApiError(...errors.createUnexpectedError(fullPath)), trace });
    }
  });
};
