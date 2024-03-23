import { exec, execSync } from "child_process";
import { v4 as uuidv4 } from "uuid";

class Log {
  constructor(status, detail, source, stack) {
    this.status = status;
    this.detail = detail;
    this.source = source;
    this.build_info = process.versions.node;
    this.commitHash = execSync("git rev-parse HEAD").toString().trim();
    this.requestId = uuidv4();
    this.stack = stack;
  }
}

export default Log;
