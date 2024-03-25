import logger from "./logger";
import Log from "./Log";
import { execSync } from "child_process";
import { v4 as uuidv4 } from "uuid";

export default (log, logLevel) => {
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
