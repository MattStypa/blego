const nodePath = require('path');
const isFile = require('./isFile.js');
const parseDataFile = require('./parseDataFile.js');
const readDir = require('./readDir.js');
const Record = require('../Record.js');
const Store = require('../Store.js');
const validateType = require('./validateType.js');

/**
 * Reads data from a directory and creates a Store.
 *
 * @private
 * @param {string} path Directory to be parsed.
 * @returns {Store}
 */
function parseDataDir(path) {
  validateType('path', 'string', path);

  const files = readDir(path).filter(isFile);
  let records = [];

  files.forEach((file) => {
    const parsedPath = nodePath.parse(nodePath.relative(path, file));
    const key = (parsedPath.dir && parsedPath.dir + nodePath.sep) + parsedPath.name;
    records.push(new Record(key, parseDataFile(file)));
  });

  const store = new Store(records);

  return store.sortBy('key');
}

module.exports = parseDataDir;
