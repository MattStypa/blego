import nodePath from 'path';
import frontMatter from 'front-matter';
import yaml from 'js-yaml';
import merge from 'lodash.merge';
import { marked } from 'marked';
import importSync from './tools/importSync.cjs';
import readFile from './tools/readFile';

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
    importSync(path)
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

export default {
  md: markdownParser,
  html: htmlParser,
  js: jsParser,
  json: jsonParser,
  yaml: yamlParser,
};
