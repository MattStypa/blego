const nodePath = require('path');
const isFile = require('./isFile.js');
const parseDataFile = require('./parseDataFile.js');
const readDir = require('./readDir.js');
const validateType = require('./validateType.js');

/**
 * Reads data from a directory.
 * @param {string} path Directory to be parsed.
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

module.exports = parseDataDir;
