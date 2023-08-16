class Logger {
  log(id, message) {
    console.log(`[Caller:${id}] ${message}`);
  }
}

module.exports = Logger;
