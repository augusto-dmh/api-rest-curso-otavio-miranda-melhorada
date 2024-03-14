import { ValidationError } from "sequelize";
import { execSync } from "child_process";
import { v4 as uuidv4 } from "uuid";
import { createUnexpectedError, createValidationError } from "../validation/errors/controllers";
import ApiError from "../validation/errors/classes/ApiError";
import logger from "../logging/logger";

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

    logger.error({
      status: validationError.status,
      message: validationError.message,
      source,
      build_info: {
        node_version: process.versions.node,
        commitHash: execSync("git rev-parse HEAD").toString().trim(),
      },
      requestId: uuidv4(),
      stack: err.stack,
    });

    res.status(400).json({ error: validationError });
    return;
  }

  if (err instanceof ApiError) {
    logger.error({
      status: err.status,
      detail: err.detail,
      source,
      build_info: {
        node_version: process.versions.node,
        commitHash: execSync("git rev-parse HEAD").toString().trim(),
      },
      request: err.requestId,
      stack: err.stack,
    });

    const { type, title, status, message, requestId } = err;
    const apiError = { type, title, status, message, requestId };

    res.status(err.status).json({ error: apiError });
    return;
  }

  logger.error({
    status: err.status,
    message: err.message,
    source,
    build_info: {
      node_version: process.versions.node,
      commitHash: execSync("git rev-parse HEAD").toString().trim(),
    },
    stack: err.stack,
  });

  res.status(500).json({
    error: createUnexpectedError(source.path),
  });
};
