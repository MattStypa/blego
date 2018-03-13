const nodePath = require('path');
const stackTrace = require('stack-trace');
const isFile = require('./isFile.js');
const longestCommonPrefix = require('./longestCommonPrefix.js');
const validateType = require('./validateType.js');

/**
 * Converts stack trace into a simpler object.
 *
 * @private
 * @param {error} error Error object to be converted.
 * @returns {object}
 */
function parseTrace(error) {
  validateType('error', Error, error);

  let basePath;
  const trace = stackTrace.parse(error).filter((item) => item.fileName && isFile(item.fileName));
  trace.forEach((item) => basePath = basePath === undefined ? item.fileName : longestCommonPrefix(basePath, item.fileName));

  return trace.map((item) => ({
    file: nodePath.relative(basePath, item.fileName),
    line: item.lineNumber,
    function: item.methodName || 'Anonymous',
  }));
}

module.exports = parseTrace
