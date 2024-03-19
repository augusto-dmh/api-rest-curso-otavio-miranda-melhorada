import { ValidationError } from "sequelize";
import { execSync } from "child_process";
import { v4 as uuidv4 } from "uuid";
import { createUnexpectedError, createValidationError } from "../validation/errors/controllers";
import ApiError from "../validation/errors/classes/ApiError";
import logger from "../logging/logger";
import LogError from "../validation/errors/classes/LogError";

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

    logger.error(
      new LogError(
        validationError.status,
        validationError.message,
        source,
        {
          node_version: process.versions.node,
          commitHash: execSync("git rev-parse HEAD").toString().trim(),
        },
        uuidv4(),
        err.stack,
      ),
    );

    res.status(400).json({ error: validationError });
    return;
  }

  if (err instanceof ApiError) {
    logger.error(
      new LogError(
        err.status,
        err.detail,
        source,
        {
          node_version: process.versions.node,
          commitHash: execSync("git rev-parse HEAD").toString().trim(),
        },
        uuidv4(),
        err.stack,
      ),
    );

    const { type, title, status, message, requestId } = err;
    const apiError = { type, title, status, message, requestId };

    res.status(err.status).json({ error: apiError });
    return;
  }

  logger.error(
    new LogError(
      err.status,
      err.detail,
      source,
      {
        node_version: process.versions.node,
        commitHash: execSync("git rev-parse HEAD").toString().trim(),
      },
      uuidv4(),
      err.stack,
    ),
  );

  res.status(500).json({
    error: createUnexpectedError(source.path),
  });
};
