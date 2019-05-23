const nodePath = require('path');
const fs = require('fs-extra');
const errors = require('./errors.js');
const exists = require('./exists.js');
const tryCatch = require('./tryCatch.js');
const validateType = require('./validateType.js');

/**
 * Checks if path exists and is a directory.
 *
 * @alias module:tools.isDir
 * @param {string} path Path to be checked.
 * @returns {boolean}
 */
function isDir(path) {
  validateType('path', 'string', path);

  path = nodePath.resolve(path);
  let isDir = false;

  tryCatch(
    () => isDir = exists(path) && fs.statSync(path).isDirectory(),
    () => errors.cantReadPath(path)
  );

  return isDir;
}

module.exports = isDir;
