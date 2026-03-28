import nodePath from 'path';
import isFile from './isFile.js';
import parseDataFile from './parseDataFile.js';
import readDir from './readDir.js';
import validateType from './validateType.js';

/**
 * Reads data from a directory and parses it
 * @param {string} path
 * @returns {array}
 */
function parseDataDir(path) {
  validateType('path', 'string', path);

  return readDir(path).filter(isFile).map((file) => {
    const parsedPath = nodePath.parse(nodePath.relative(path, file));

    return {
      key: (parsedPath.dir && (parsedPath.dir + nodePath.sep)) + parsedPath.name,
      props: parseDataFile(file),
    };
  });
}

export default parseDataDir;
