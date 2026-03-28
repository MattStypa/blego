import nodePath from 'path';
import fs from 'fs-extra';
import errors from '../errors.js';
import exists from './exists.js';
import isDir from './isDir.js';
import isFile from './isFile.js';
import readDir from './readDir.js';
import tryCatch from './tryCatch.js';
import validateType from './validateType.js';

/**
 * Copies files or directories
 * If source is a file and destination exists, it must be a directory
 * If source is a directory, the destination must be an existing directory
 * @param {string} src
 * @param {string} dest
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
 * Copies a file without overwriting
 * @private
 * @param {string} src
 * @param {string} dest
 */
function copyFile(src, dest) {
  exists(dest) && errors.pathExists(dest);

  tryCatch(
     () => fs.copySync(src, dest),
     () => errors.cantCopy(src, dest)
  );
}

export default copy;
