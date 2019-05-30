const nodePath = require('path');
const fs = require('fs-extra');
const errors = require('../errors.js');
const exists = require('./exists.js');
const isDir = require('./isDir.js');
const tryCatch = require('./tryCatch.js');
const validateType = require('./validateType.js');

/**
 * Deletes everything from a given directory.
 * This can not be undone. Be sure that you know what you are doing.
 * @param {string} path Path to a directory.
 */
function cleanDir(path) {
  validateType('path', 'string', path);

  path = nodePath.resolve(path);
  !exists(path) && errors.pathDoesNotExist(path);
  !isDir(path) && errors.notDir(path);

  tryCatch(
    () => fs.emptyDirSync(path),
    () => errors.cantClean(path)
  );
}

module.exports = cleanDir;
