const nodePath = require('path');
const fs = require('fs-extra');
const merge = require('lodash.merge');
const errors = require('../errors.js');
const handlebars = require('../handlebars.js');
const paths = require('../paths.js');
const exists = require('../tools/exists.js');
const jailPath = require('../tools/jailPath.js');
const readFile = require('../tools/readFile.js');
const validateType = require('../tools/validateType.js');

/**
 * Randers a page
 * @param {string} path Relative path to the rendered file
 * @param {string} templatePath Relative path to the template file
 * @param {object} context Data available in the template
 */
function page(path, templatePath, context) {
  validateType('path', 'string', path);
  validateType('templatePath', 'string', templatePath);
  validateType('context', Object, context);

  path = jailPath(path);
  templatePath = jailPath(templatePath);
  path = nodePath.resolve(paths.dest, path);
  templatePath = nodePath.resolve(paths.template, templatePath);
  exists(path) && errors.pathExists(path);

  const templateSource = readFile(templatePath);
  const templateCompiled = handlebars.compile(templateSource);
  const rendered = templateCompiled(merge({}, this.global, context));
  fs.ensureFileSync(path);
  fs.writeFileSync(path, rendered);
}

module.exports = page;
