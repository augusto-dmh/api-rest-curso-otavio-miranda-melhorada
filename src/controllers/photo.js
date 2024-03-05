import { ValidationError } from "sequelize";
import * as errors from "../validation/errors";
import Photo from "../models/Photo";

const store = async (req, res) => {
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
};

export default { store };
