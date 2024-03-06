import * as errors from "../validation/errors";
import Student from "../models/Student";
import Photo from "../models/Photo";

const index = async (req, res, next) => {
  try {
    const students = await Student.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [
        ["id", "DESC"],
        [Photo, "id", "DESC"],
      ],
      include: {
        model: Photo,
        attributes: ["url", "filename"],
      },
    });

    res.json(students);
  } catch (err) {
    next(err);
  }
};

const store = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);

    res.json(student);
  } catch (err) {
    next(err);
  }
};

const show = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      next(errors.controllers.missingId);
      return;
    }

    const student = await Student.findByPk(id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      order: [
        ["id", "DESC"],
        [Photo, "id", "DESC"],
      ],
      include: {
        model: Photo,
        attributes: ["url", "filename"],
      },
    });

    if (!student) {
      next(errors.controllers.studentNotFound);
      return;
    }

    res.json(student);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      next(errors.controllers.missingId);
      return;
    }

    const student = await Student.findByPk(id);

    if (!student) {
      next(errors.controllers.studentNotFound);
      return;
    }

    await student.destroy();
    res.json("Student successfully deleted");
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      next(errors.controllers.missingId);
      return;
    }

    const student = await Student.findByPk(id);

    if (!student) {
      next(errors.controllers.studentNotFound);
      return;
    }

    const newStudent = await Student.update(req.body);

    res.json(newStudent);
  } catch (err) {
    next(err);
  }
};

export default { index, store, show, destroy, update };
