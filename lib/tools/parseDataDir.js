import nodePath from 'path';
import isFile from './isFile';
import parseDataFile from './parseDataFile';
import readDir from './readDir';
import validateType from './validateType';

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
