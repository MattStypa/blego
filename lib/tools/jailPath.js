const nodePath = require('path');
const validateType = require('./validateType.js');

/**
 * Prevents path from escaping its base directory
 * @param {string} path
 * @returns {string}
 */
function jailPath(path) {
  validateType('path', 'string', path);

  return nodePath.relative('/', nodePath.resolve('/', path));
}

module.exports = jailPath;
