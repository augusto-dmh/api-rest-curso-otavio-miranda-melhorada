import * as errors from "../validation/errors";
import ApiError from "../validation/errors/classes/ApiError";
import Student from "../models/Student";
import Photo from "../models/Photo";
import stacktrace from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";
import { Op } from "sequelize";
import { get } from "lodash";

const index = async (req, res, next) => {
  const { cursor, page_size } = req.query;
  const sort_by = get(req.query, "sort_by", "id.desc").split(".");

  const queryBase = {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    order: [
      [sort_by[0], sort_by[1]],
      [Photo, "id", "DESC"],
    ],
    include: {
      model: Photo,
      attributes: ["url", "filename"],
    },
  };

  if (cursor && page_size) {
    queryBase.where = {
      id: { [Op.lte]: Number(cursor) },
    };
    queryBase.limit = Number(page_size) + 1;
  }

  try {
    const students = await Student.findAll(queryBase);

    cursor && page_size
      ? res.json({ students, next_cursor: students[students.length - 1].id })
      : res.json(students);
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
