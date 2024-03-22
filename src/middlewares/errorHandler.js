import { ValidationError } from "sequelize";
import { createUnexpectedError, createValidationError } from "../validation/errors/controllers";
import ApiError from "../validation/errors/classes/ApiError";
import logError from "../logging/logError";

/* eslint-disable no-unused-vars */ // error-handling middleware demands "next" to work.
export default ({ err, source }, req, res, next) => {
  if (err instanceof ValidationError) {
    const subErrors = [];
    const fields = [];
    err.errors.forEach(({ message, path }) => {
      subErrors.push(message);
      fields.push(path);
    });
    const validationError = createValidationError(fields.join(", "));
    validationError.subErrors = err.errors.map((error) => error.message);

    logError({ validationError, source }, err.stack);
    res.status(400).json({ error: validationError });
    return;
  }

  if (err instanceof ApiError) {
    const { type, title, status, message, requestId } = err;
    const apiError = { type, title, status, message, requestId };

    logError({ err, source }, err.stack);
    res.status(err.status).json({ error: apiError });
    return;
  }

  logError({ err, source }, err.stack);
  res.status(500).json({
    error: createUnexpectedError(source.path),
  });
};
