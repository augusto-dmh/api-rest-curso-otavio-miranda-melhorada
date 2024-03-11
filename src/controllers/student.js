import * as errors from "../validation/errors";
import ApiError from "../validation/errors/classes/ApiError";
import ErrorContext from "../validation/errors/classes/ErrorContext";
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
    next(
      new ErrorContext(err, {
        function: "Student.findAll",
        file: "src/controllers/student.js",
        line: 7,
      }),
    );
  }
};

const store = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);

    res.json(student);
  } catch (err) {
    next(
      new ErrorContext(err, {
        function: "Student.create",
        file: "src/controllers/student.js",
        line: 34,
      }),
    );
  }
};

const show = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ErrorContext(new ApiError(...errors.controllers.missingId), {
        function: "studentController.show",
        file: "src/controllers/student.js",
        line: 53,
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
      throw new ErrorContext(new ApiError(...errors.controllers.studentNotFound), {
        function: "studentController.show",
        file: "src/controllers/student.js",
        line: 76,
      });
    }

    res.json(student);
  } catch (err) {
    next(
      new ErrorContext(err, {
        function: "Student.findByPk",
        file: "src/controllers/student.js",
        line: 65,
      }),
    );
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ErrorContext(new ApiError(...errors.controllers.missingId), {
        function: "studentController.destroy",
        file: "src/controllers/student.js",
        line: 106,
      });
    }

    const student = await Student.findByPk(id);

    if (!student) {
      throw new ErrorContext(new ApiError(...errors.controllers.studentNotFound), {
        function: "studentController.destroy",
        file: "src/controllers/student.js",
        line: 120,
      });
    }

    await student.destroy();
    res.json("Student successfully deleted");
  } catch (err) {
    next(err);
    // all controllers methods with more than one place prone to throw and error
    // - like this: "Student.findByPk" and "student.destroy" - will not send a source to the error-handler middleware.
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new ErrorContext(new ApiError(...errors.controllers.missingId), {
        function: "studentController.update",
        file: "src/controllers/student.js",
        line: 145,
      });
    }

    const student = await Student.findByPk(id);

    if (!student) {
      throw new ErrorContext(new ApiError(...errors.controllers.studentNotFound), {
        function: "studentController.update",
        file: "src/controllers/student.js",
        line: 159,
      });
    }

    const newStudent = await Student.update(req.body);

    res.json(newStudent);
  } catch (err) {
    next(err);
  }
};

export default { index, store, show, destroy, update };
