import multer from "multer";
import multerConfig from "../config/multer";
import * as errors from "../validation/errors/controllers";

export default (req, res, next) => {
  const upload = multer(multerConfig).single("photo");

  upload(req, res, (err) => {
    if (!err) return next();

    if (err.code === "LIMIT_INVALID_TYPE") {
      res.status(400).json({ error: errors.invalidPhotoType });
      return;
    }
    if (err.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({ error: errors.invalidPhotoSize });
      return;
    }
    return res.status(500).json({ error: errors.internalServerError });
  });
};
