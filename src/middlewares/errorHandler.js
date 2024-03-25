import { ValidationError } from "sequelize";
import { createUnexpectedError, createValidationError } from "../validation/errors/controllers";
import ApiError from "../validation/errors/classes/ApiError";
import logHandler from "../logging/handler";
import Log from "../logging/Log";

/* eslint-disable no-unused-vars */ // error-handling middleware demands "next" to work.
export default ({ err, trace }, req, res, next) => {
  const { status, detail } = err;

  if (err instanceof ValidationError) {
    const subErrors = [];
    const fields = [];
    err.errors.forEach(({ message, path }) => {
      subErrors.push(message);
      fields.push(path);
    });
    const validationError = createValidationError(fields.join(", "));
    validationError.subErrors = err.errors.map((error) => error.message);
    const { status, detail } = validationError;

    const log = new Log(status, detail, trace, err.stack);
    logHandler(log, "error");

    res.status(400).json({ error: validationError });
    return;
  }

  const log = new Log(status, detail, trace, err.stack);
  logHandler(log, "error");

  if (err instanceof ApiError) {
    res.status(err.status).json({ error: { ...err, detail: undefined } }); // 'detail' must only be shown on logging.
    return;
  }

  res.status(500).json({
    error: createUnexpectedError(trace[0].getFileName()),
  });
};
