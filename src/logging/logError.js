import logger from "./logger";
import LogError from "../validation/errors/classes/LogError";
import { execSync } from "child_process";
import { v4 as uuidv4 } from "uuid";

export default (errContext, stack) => {
  const { err, source } = errContext;
  const logError = new LogError(
    err.status,
    err.message,
    source,
    {
      node_version: process.versions.node,
      commitHash: execSync("git rev-parse HEAD").toString().trim(),
    },
    uuidv4(),
    stack,
  );

  logger.error(logError);
};
