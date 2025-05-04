import * as log from "loglevel";

class Logger {
  static setLevel(level) {
    log.setLevel(level);
  }

  static warn(msg) {
    log.warn(msg);
  }

  static info(msg) {
    log.info(msg);
  }

  static debug(msg) {
    log.debug(msg);
  }

  static error(msg) {
    log.error(msg);
  }

  static trace(msg) {
    log.trace(msg);
  }
}

export default Logger;
