const nodePath = require('path');
const fs = require('fs-extra');
const errors = require('../errors.js');
const exists = require('./exists.js');
const isDir = require('./isDir.js');
const isFile = require('./isFile.js');
const readDir = require('./readDir.js');
const tryCatch = require('./tryCatch.js');
const validateType = require('./validateType.js');

/**
 * Copies files or directories.
 * If source is a file and destination exists, it must be a directory.
 * If source is a directory, the destination must be an existing directory.
 * @alias module:tools.copy
 * @param {string} src Source path.
 * @param {string} dest Destination path.
 */
function copy(src, dest) {
  validateType('src', 'string', src);
  validateType('dest', 'string', dest);

  src = nodePath.resolve(src);
  dest = nodePath.resolve(dest);
  const destFilePath = nodePath.resolve(dest, nodePath.basename(src));

  !exists(src) && errors.pathDoesNotExist(src);
  isFile(dest) && errors.pathExists(dest);
  isFile(src) && isDir(dest) && exists(destFilePath) && errors.pathExists(destFilePath);

  isFile(src) && !exists(dest) && copyFile(src, dest);
  isFile(src) && isDir(dest) && copyFile(src, destFilePath);

  if (isDir(src)) {
    const srcDir = src;
    const destDir = dest;
    const srcs = readDir(src, '**/*', true, true);

    srcs.forEach((src) => {
      const dest = nodePath.resolve(destDir, nodePath.relative(srcDir, src));
      isDir(src) && fs.ensureDirSync(dest);
      isFile(src) && copyFile(src, dest);
    });
  }
}

/**
 * Copies a file without overwritting.
 * @private
 * @param {string} src Source path.
 * @param {string} dest Destination path.
 */
function copyFile(src, dest) {
  exists(dest) && errors.pathExists(dest);

  tryCatch(
     () => fs.copySync(src, dest),
     () => errors.cantCopy(src, dest)
  );
}

module.exports = copy;
