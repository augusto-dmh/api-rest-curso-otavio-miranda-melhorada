import Photo from "../models/Photo";
import ErrorContext from "../validation/errors/classes/ErrorContext";

const store = async (req, res, next) => {
  const { originalname, filename } = req.file;
  const { studentId } = req.body;

  try {
    const photo = await Photo.create({ originalname, filename, studentId });

    res.json(photo);
  } catch (err) {
    next(
      new ErrorContext(err, {
        function: "Photo.create",
        file: "src/controllers/photo.js",
        line: 8,
      }),
    );
  }
};

export default { store };
