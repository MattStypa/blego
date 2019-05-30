const nodePath = require('path');
const stackTrace = require('stack-trace');
const isFile = require('./isFile.js');

/**
 * Converts stack trace into a simpler object.
 * @param {error} error Error object to be converted.
 * @returns {object}
 */
function parseTrace(error) {
  const trace = stackTrace.parse(error).filter((item) => item.fileName && isFile(item.fileName));

  return trace.map((item) => ({
    file: nodePath.relative(process.cwd(), item.fileName),
    line: item.lineNumber,
    function: item.methodName || 'Anonymous',
  }));
}

module.exports = parseTrace;
