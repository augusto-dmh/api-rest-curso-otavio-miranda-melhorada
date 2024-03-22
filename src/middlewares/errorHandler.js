import { ValidationError } from "sequelize";
import { createUnexpectedError, createValidationError } from "../validation/errors/controllers";
import ApiError from "../validation/errors/classes/ApiError";
import logHandler from "../logging/handler";

/* eslint-disable no-unused-vars */ // error-handling middleware demands "next" to work.
export default ({ err, source }, req, res, next) => {
  const { type, title, status, message, detail, requestId } = err;

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

    logHandler({ status, detail, source }, err.stack, "error");
    res.status(400).json({ error: validationError });
    return;
  }

  if (err instanceof ApiError) {
    const apiError = { type, title, status, message, requestId };

    logHandler({ status, detail, source }, err.stack, "error");
    res.status(err.status).json({ error: apiError });
    return;
  }

  logHandler({ status, detail, source }, err.stack, "error");
  res.status(500).json({
    error: createUnexpectedError(source.path),
  });
};
