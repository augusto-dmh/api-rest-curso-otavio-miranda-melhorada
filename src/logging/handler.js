import logger from "./logger";
import Log from "./log";
import { execSync } from "child_process";
import { v4 as uuidv4 } from "uuid";

export default (logContext, stack, logLevel) => {
  const { status, detail, source } = logContext;

  const log = new Log(
    status,
    detail,
    source,
    {
      node_version: process.versions.node,
      commitHash: execSync("git rev-parse HEAD").toString().trim(),
    },
    uuidv4(),
    stack,
  );

  switch (logLevel) {
    case "debug":
      logger.debug(log);
      break;

    case "debug": {
      logger.debug(log);
      break;
    }

    case "info": {
      logger.info(log);
      break;
    }

    case "warn": {
      logger.warn(log);
      break;
    }

    case "error": {
      logger.error(log);
      break;
    }

    case "fatal": {
      logger.fatal(log);
      break;
    }
  }
};
