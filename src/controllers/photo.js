import Photo from "../models/Photo";
import ErrorContext from "../validation/errors/classes/ErrorContext";

const store = async (req, res, next) => {
  const { originalname, filename } = req.file;
  const { studentId } = req.body;

  try {
    const photo = await Photo.create({ originalname, filename, studentId });

    res.json(photo);
  } catch (err) {
    err instanceof ErrorContext
      ? next(err)
      : next(
          new ErrorContext(err, {
            function: "Photo.create",
            file: "src/controllers/photo.js",
            path: "/photos",
            line: 8,
          }),
        );
  }
};

export default { store };
