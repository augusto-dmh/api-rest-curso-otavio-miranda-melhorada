import * as errors from "../validation/errors";
import ApiError from "../validation/errors/classes/ApiError";
import Student from "../models/Student";
import Photo from "../models/Photo";
import stacktrace from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";
import { Op } from "sequelize";

const index = async (req, res, next) => {
  const [cursor, pageSize] = [Number(req.query.cursor), Number(req.query.pageSize)];
  const queryBase = {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    order: [
      ["id", "DESC"],
      [Photo, "id", "DESC"],
    ],
    include: {
      model: Photo,
      attributes: ["url", "filename"],
    },
  };

  try {
    if (cursor && pageSize) {
      const students = await Student.findAll({
        ...queryBase,
        where: {
          id: {
            [Op.lte]: cursor,
          },
        },
        limit: pageSize + 1,
      });
      res.json({ students, next_cursor: students[students.length - 1].id });
      return;
    }

    const students = await Student.findAll(queryBase);
    res.json(students);
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const store = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);

    res.json(student);
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const show = async (req, res, next) => {
  const fullPath = req.baseUrl + req.path;
  const { id } = req.params;

  try {
    if (!id) throw new ApiError(...errors.controllers.createMissingId(fullPath));

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

    if (!student) throw new ApiError(...errors.controllers.createStudentNotFound(id, fullPath));

    res.json(student);
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const destroy = async (req, res, next) => {
  const fullPath = req.baseUrl + req.path;
  const { id } = req.params;

  try {
    if (!id) throw new ApiError(...errors.controllers.createMissingId(fullPath));

    const student = await Student.findByPk(id);

    if (!student) throw new ApiError(...errors.controllers.createStudentNotFound(id, fullPath));

    await student.destroy();
    res.json("Student successfully deleted");
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const fullPath = req.baseUrl + req.path;

  try {
    if (!id) throw new ApiError(...errors.controllers.createMissingId(fullPath));

    const student = await Student.findByPk(id);

    if (!student) throw new ApiError(...errors.controllers.createStudentNotFound(id, fullPath));

    const newStudent = await Student.update(req.body);

    res.json(newStudent);
  } catch (err) {
    const trace = stacktrace.parse(err);
    const errorContext = new ErrorContext(err, trace);

    next(errorContext);
  }
};

export default { index, store, show, destroy, update };
