import * as errors from "../validation/errors";
import ApiError from "../validation/errors/classes/ApiError";
import Student from "../models/Student";
import Photo from "../models/Photo";
import stacktrace from "stack-trace";
import ErrorContext from "../validation/errors/classes/ErrorContext";
import { Op } from "sequelize";
import { get } from "lodash";
import queryString from "query-string";

const index = async (req, res, next) => {
  const qs = queryString.parse(req.originalUrl.split("?")[1], { arrayFormat: "comma" });
  const { cursor, page_size } = qs;
  const sort_by = get(qs, "sort_by", ["id.desc"]);

  const queryBase = {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    order: [...parseSortBy(sort_by), [Photo, "id", "DESC"]],
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

function parseSortBy(sort_by) {
  return sort_by.map((sB) => {
    const sbParsed = sB.split(".");
    return [sbParsed[0], sbParsed[1]];
  });
}

export default { index, store, show, destroy, update };
