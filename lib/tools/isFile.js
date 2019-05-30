const nodePath = require('path');
const fs = require('fs-extra');
const errors = require('../errors.js');
const exists = require('./exists.js');
const tryCatch = require('./tryCatch.js');
const validateType = require('./validateType.js');

/**
 * Checks if path exists and is a file
 * @param {string} path
 * @returns {boolean}
 */
function isFile(path) {
  validateType('path', 'string', path);

  path = nodePath.resolve(path);
  let isFile = false;

  tryCatch(
    () => isFile = exists(path) && fs.statSync(path).isFile(),
    () => errors.cantReadPath(path)
  );

  return isFile;
}

module.exports = isFile;
