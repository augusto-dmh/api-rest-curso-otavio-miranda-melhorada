import { ValidationError } from "sequelize";
import { internalServerError, validationError } from "../validation/errors/controllers";
import ApiError from "../validation/errors/classes/ApiError";

/* eslint-disable no-unused-vars */ // error-handling middleware demands "next" to work.
export default (err, req, res, next) => {
  if (err instanceof ValidationError) {
    validationError.subErrors = err.errors.map((error) => error.message);
    res.status(400).json({ error: validationError });
    return;
  }

  if (err instanceof ApiError) {
    res.status(err.status).json({ error: err });
    return;
  }

  res.status(500).json({
    error: internalServerError,
  });
};
