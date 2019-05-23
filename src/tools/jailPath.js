const nodePath = require('path');
const validateType = require('./validateType.js');

/**
 * Prevents path from escaping its base directory.
 * @alias module:tools.jailPath
 * @param {string} path Path to be jailed.
 * @returns {string}
 */
function jailPath(path) {
  validateType('path', 'string', path);

  return nodePath.relative('/', nodePath.resolve('/', path));
}

module.exports = jailPath;
