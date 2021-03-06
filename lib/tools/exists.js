const nodePath = require('path');
const fs = require('fs-extra');
const errors = require('../errors.js');
const tryCatch = require('./tryCatch.js');
const validateType = require('./validateType.js');

/**
 * Checks if the path exists
 * @param {string} path
 * @returns {boolean}
 */
function exists(path) {
  validateType('path', 'string', path);

  path = nodePath.resolve(path);
  let exists = false;

  tryCatch(
    () => exists = fs.existsSync(path),
    () => errors.cantReadPath(path)
  );

  return exists;
}

module.exports = exists;
