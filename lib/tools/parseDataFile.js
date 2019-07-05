const nodePath = require('path');
const parsers = require('../parsers.js');
const errors = require('../errors.js');
const tryCatch = require('./tryCatch.js');
const validateType = require('./validateType.js');

/**
 * Reads data from a file and parses it
 * @param {string} path
 * @returns {object}
 */
function parseDataFile(path) {
  validateType('path', 'string', path);

  const type = nodePath.extname(path).slice(1);

  path = nodePath.resolve(path);
  !type && errors.noType(path);
  !parsers[type] && errors.noParser(path);

  let content;

  tryCatch(
    () => content = parsers[type](path),
    () => errors.cantParse(path)
  );

  return content;
}

module.exports = parseDataFile;
