const nodePath = require('path');
const stackTrace = require('stack-trace');
const isFile = require('./isFile.js');
const validateType = require('./validateType.js');

/**
 * Converts stack trace into a simpler object.
 * @private
 * @param {error} error Error object to be converted.
 * @returns {object}
 */
function parseTrace(error) {
  validateType('error', Error, error);

  const trace = stackTrace.parse(error).filter((item) => item.fileName && isFile(item.fileName));

  return trace.map((item) => ({
    file: nodePath.relative(process.cwd(), item.fileName),
    line: item.lineNumber,
    function: item.methodName || 'Anonymous',
  }));
}

module.exports = parseTrace;
