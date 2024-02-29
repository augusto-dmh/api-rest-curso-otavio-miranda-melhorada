import multer from "multer";
import { ValidationError } from "sequelize";
import * as errors from "../validation/errors";
import multerConfig from "../config/multer";
import Foto from "../models/Foto";

const upload = multer(multerConfig).single("photo");

const store = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        errors: errors.controllers.invalidFotoType,
      });
    }

    const { originalname, filename } = req.file;
    const { aluno_id } = req.body;

    try {
      const foto = await Foto.create({ originalname, filename, aluno_id });

      res.json(foto);
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e);
        const apiError = errors.controllers.validationError;
        apiError.subErrors = e.errors.map((error) => error.message);

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
