const nodePath = require('path');
const frontMatter = require('front-matter');
const marked = require('marked');
const merge = require('lodash.merge');
const yaml = require('js-yaml');
const readFile = require('./tools/readFile.js');

/**
 * Parses a Markdown file
 * @param {string} path
 * @returns {object}
 */
function markdownParser(path) {
  const parsedFrontMatter = frontMatter(readFile(path));

  return merge(
    {},
    parsedFrontMatter.attributes,
    {body: marked.parse(parsedFrontMatter.body)}
  );
}

/**
 * Parses an HTML file
 * @param {string} path
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
 * Parses a JavaScript file
 * @param {string} path
 * @returns {object}
 */
function jsParser(path) {
  path = nodePath.resolve(path);

  return merge(
    {},
    require(path)
  );
}

/**
 * Parses a JSON file
 * @param {string} path
 * @returns {object}
 */
function jsonParser(path) {
  return JSON.parse(readFile(path));
}

/**
 * Parses a YAML file
 * @param {string} path
 * @returns {object}
 */
function yamlParser(path) {
  return yaml.load(readFile(path));
}

module.exports = {
  md: markdownParser,
  html: htmlParser,
  js: jsParser,
  json: jsonParser,
  yaml: yamlParser,
};
