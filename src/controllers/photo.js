import Photo from "../models/Photo";

const store = async (req, res, next) => {
  const { originalname, filename } = req.file;
  const { studentId } = req.body;

  try {
    const photo = await Photo.create({ originalname, filename, studentId });

    res.json(photo);
  } catch (err) {
    next(err);
  }
};

export default { store };
