import multer from "multer";
import { ValidationError } from "sequelize";
import * as errors from "../validation/errors";
import multerConfig from "../config/multer";
import Photo from "../models/Photo";

const upload = multer(multerConfig).single("photo");

const store = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        errors: errors.controllers.invalidPhotoType,
      });
    }

    const { originalname, filename } = req.file;
    const { studentId } = req.body;

    try {
      const photo = await Photo.create({ originalname, filename, studentId });

      res.json(photo);
    } catch (err) {
      if (err instanceof ValidationError) {
        const apiError = errors.controllers.validationError;
        apiError.subErrors = err.errors.map((error) => error.message);

        res.status(400).json({
          error: apiError,
        });
        return;
      }

      res.status(500).json({
        error: errors.controllers.internalServerError,
      });
    }
  });
};

export default { store };
