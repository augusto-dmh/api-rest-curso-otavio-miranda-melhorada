import Photo from "../models/Photo";

const store = async (req, res, next) => {
  const { originalname, filename } = req.file;
  const { studentId } = req.body;

  try {
    const photo = await Photo.create({ originalname, filename, studentId });

    res.json(photo);
  } catch (err) {
    next({
      err,
      source: {
        function: "Photo.create",
        file: "src/controllers/photo.js",
        line: 8,
      },
    });
  }
};

export default { store };
