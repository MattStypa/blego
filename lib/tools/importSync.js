const nodePath = require('path');
const validateType = require('./validateType.js');

/**
 * Imports a file synchronously
 * @param {string} path
 * @returns {object}
 */
function importSync(path) {
  validateType('path', 'string', path);
  path = nodePath.resolve(path);

  return require(path);
}

module.exports = importSync;
