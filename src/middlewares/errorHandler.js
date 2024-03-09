import { ValidationError } from "sequelize";
import { execSync } from "child_process";
import { internalServerError, validationError } from "../validation/errors/controllers";
import ApiError from "../validation/errors/classes/ApiError";
import logger from "../logging/logger";

/* eslint-disable no-unused-vars */ // error-handling middleware demands "next" to work.
export default ({ err, source }, req, res, next) => {
  if (err instanceof ValidationError) {
    validationError.subErrors = err.errors.map((error) => error.message);
    validationError.stack = err.stack;

    logger.error({
      status: validationError.status,
      message: validationError.message,
      source,
      build_info: {
        node_version: process.versions.node,
        commitHash: execSync("git rev-parse HEAD").toString().trim(),
      },
      stack: validationError.stack,
    });

    res.status(400).json({ error: validationError });
    return;
  }

  if (err instanceof ApiError) {
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

    res.status(err.status).json({ error: err });
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
    error: internalServerError,
  });
};
