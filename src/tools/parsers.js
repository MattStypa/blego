const nodePath = require('path');
const frontMatter = require('front-matter');
const marked = require('marked');
const merge = require('lodash.merge');
const yaml = require('js-yaml');
const errors = require('../errors.js');
const readFile = require('./readFile.js');
const tryCatch = require('./tryCatch.js');
const validateType = require('./validateType.js');

/**
 * Parses markdown file.
 *
 * @private
 * @param {string} path File to be parsed.
 * @returns {object}
 */
function markdownParser(path) {
  const parsedFrontMatter = frontMatter(readFile(path));

  return merge(
    {},
    parsedFrontMatter.attributes,
    {body: marked(parsedFrontMatter.body)}
  );
}

/**
 * Parses HTML file.
 *
 * @private
 * @param {string} path File to be parsed.
 * @returns {object}
 */
function htmlParser(path) {
  const parsedFrontMatter = frontMatter(readFile(path));

  return merge(
    {},
    parsedFrontMatter.attributes,
    {body: parsedFrontMatter.body}
  );
}

/**
 * Parses JavaScript file.
 *
 * @private
 * @param {string} path File to be parsed.
 * @returns {object}
 */
function jsParser(path) {
  return merge(
    {body: ''},
    require(path)
  );
}

/**
 * Parses JSON file.
 *
 * @private
 * @param {string} path File to be parsed.
 * @returns {object}
 */
function jsonParser(path) {
  return JSON.parse(readFile(path));
}

/**
 * Parses YAML file.
 *
 * @private
 * @param {string} path File to be parsed.
 * @returns {object}
 */
function yamlParser(path) {
  return yaml.safeLoad(readFile(path));
}

module.exports = {
  'md': markdownParser,
  'html': htmlParser,
  'js': jsParser,
  'json': jsonParser,
  'yaml': yamlParser,
};
