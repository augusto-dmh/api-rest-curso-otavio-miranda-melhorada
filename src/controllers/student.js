import { ValidationError } from "sequelize";
import * as errors from "../validation/errors";
import Student from "../models/Student";
import Photo from "../models/Photo";

const index = async (req, res) => {
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
    res.status(500).json({
      error: errors.controllers.internalServerError,
    });
  }
};

const store = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.json(student);
  } catch (e) {
    if (e instanceof ValidationError) {
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
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: errors.controllers.missingId,
      });
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
      return res.status(404).json({
        errors: errors.controllers.studentNotFound,
      });
    }

    res.json(student);
  } catch (e) {
    if (e instanceof ValidationError) {
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
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: errors.controllers.missingId,
      });
    }

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({
        errors: errors.controllers.studentNotFound,
      });
    }

    await student.destroy();
    res.json("Student successfully deleted");
  } catch (e) {
    res.status(500).json({
      error: errors.controllers.internalServerError,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: errors.controllers.missingId,
      });
    }

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({
        errors: errors.controllers.studentNotFound,
      });
    }

    const newStudent = await Student.update(req.body);

    res.json(newStudent);
  } catch (e) {
    if (e instanceof ValidationError) {
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
};

export default { index, store, show, destroy, update };
