const nodePath = require('path');
const frontMatter = require('front-matter');
const marked = require('marked');
const merge = require('lodash.merge');
const yaml = require('js-yaml');
const errors = require('../errors.js');
const readFile = require('./readFile.js');
const tryCatch = require('./tryCatch.js');
const validateType = require('./validateType.js');

const PARSERS = {
  'md': markdownParser,
  'html': htmlParser,
  'json': jsonParser,
  'yaml': yamlParser,
};

/**
 * Reads data from a file and creates a Record.
 *
 * @private
 * @param {string} path File to be parsed.
 * @returns {Record}
 */
function parseDataFile(path) {
  validateType('path', 'string', path);

  const type = nodePath.extname(path).slice(1);

  !type && errors.noType(path);
  !PARSERS[type] && errors.noParser(path);

  const source = readFile(path);
  let content;

  tryCatch(
    () => content = PARSERS[type](source),
    () => errors.cantParse(path)
  );

  content instanceof Object || (content = {content});

  return content;
}

/**
 * Parses markdown.
 *
 * @private
 * @param {string} str String to be parsed.
 * @returns {object}
 */
function markdownParser(str) {
  const parsedFrontMatter = frontMatter(str);

  return merge(
    {},
    parsedFrontMatter.attributes,
    {body: marked(parsedFrontMatter.body)}
  );
}

/**
 * Parses HTML.
 *
 * @private
 * @param {string} str String to be parsed.
 * @returns {object}
 */
function htmlParser(str) {
  const parsedFrontMatter = frontMatter(str);

  return merge(
    {},
    parsedFrontMatter.attributes,
    {body: parsedFrontMatter.body}
  );
}

/**
 * Parses JSON.
 *
 * @private
 * @param {string} str String to be parsed.
 * @returns {object}
 */
function jsonParser(str) {
  return JSON.parse(str);
}

/**
 * Parses YAML.
 *
 * @private
 * @param {string} str String to be parsed.
 * @returns {object}
 */
function yamlParser(str) {
  return yaml.safeLoad(str);
}

module.exports = parseDataFile;
