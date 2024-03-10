import * as errors from "../validation/errors";
import ApiError from "../validation/errors/classes/ApiError";
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
    next({
      err,
      source: {
        function: "Student.findAll",
        file: "src/controllers/student.js",
        line: 7,
      },
    });
  }
};

const store = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);

    res.json(student);
  } catch (err) {
    next({
      err,
      source: {
        function: "Student.create",
        file: "src/controllers/student.js",
        line: 34,
      },
    });
  }
};

const show = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      next({
        err: new ApiError(...errors.controllers.missingId),
        source: {
          function: "studentController.show",
          file: "src/controllers/student.js",
          line: 53,
        },
      });
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
      next({
        err: new ApiError(...errors.controllers.studentNotFound),
        source: {
          function: "studentController.show",
          file: "src/controllers/student.js",
          line: 77,
        },
      });
      return;
    }

    res.json(student);
  } catch (err) {
    next({
      err,
      source: {
        function: "Student.findByPk",
        file: "src/controllers/student.js",
        line: 65,
      },
    });
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      next({
        err: new ApiError(...errors.controllers.missingId),
        source: {
          function: "studentController.destroy",
          file: "src/controllers/student.js",
          line: 106,
        },
      });
      return;
    }

    const student = await Student.findByPk(id);

    if (!student) {
      next({
        err: new ApiError(...errors.controllers.studentNotFound),
        source: {
          function: "studentController.destroy",
          file: "src/controllers/student.js",
          line: 120,
        },
      });
      return;
    }

    await student.destroy();
    res.json("Student successfully deleted");
  } catch (err) {
    next({ err });
    // all controllers methods with more than one place prone to throw and error
    // - like this: "Student.findByPk" and "student.destroy" - will not send a source to the error-handler middleware.
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      next({
        err: new ApiError(...errors.controllers.missingId),
        source: {
          function: "studentController.update",
          file: "src/controllers/student.js",
          line: 145,
        },
      });
      return;
    }

    const student = await Student.findByPk(id);

    if (!student) {
      next({
        err: new ApiError(...errors.controllers.studentNotFound),
        source: {
          function: "studentController.update",
          file: "src/controllers/student.js",
          line: 159,
        },
      });
      return;
    }

    const newStudent = await Student.update(req.body);

    res.json(newStudent);
  } catch (err) {
    next({ err });
  }
};

export default { index, store, show, destroy, update };
