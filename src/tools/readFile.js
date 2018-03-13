const nodePath = require('path');
const fs = require('fs-extra');
const errors = require('../errors.js');
const exists = require('./exists.js');
const isFile = require('./isFile.js');
const tryCatch = require('./tryCatch.js');
const validateType = require('./validateType.js');

/**
 * Reads content from a file.
 *
 * @alias module:tools.readFile
 * @param {string} path Path to a file.
 * @returns {string}
 */
function readFile(path) {
  validateType('path', 'string', path);

  path = nodePath.resolve(path);
  !exists(path) && errors.pathDoesNotExist(path);
  !isFile(path) && errors.notFile(path);
  let content;

  tryCatch(
    () => content = fs.readFileSync(path).toString(),
    () => errors.cantReadPath(path)
  );

  return content;
}

module.exports = readFile;
