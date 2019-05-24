const nodePath = require('path');
const fs = require('fs-extra');
const merge = require('lodash.merge');
const errors = require('../errors.js');
const handlebars = require('../handlebars.js');
const paths = require('../paths.js');
const tools = require('../tools.js');

/**
 * Creates a rendered page.
 * @instance
 * @memberof Blego
 * @param {string} path Path to a rendered file.
 * @param {string} templatePath Path to the template file.
 * @param {object} context Data available in the template.
 */
function page(path, templatePath, context) {
  tools.validateType('path', 'string', path);
  tools.validateType('templatePath', 'string', templatePath);
  tools.validateType('context', Object, context);

  path = tools.jailPath(path);
  templatePath = tools.jailPath(templatePath);
  path = nodePath.resolve(paths.dest, path);
  templatePath = nodePath.resolve(paths.template, templatePath);
  tools.exists(path) && errors.pathExists(path);

  const templateSource = tools.readFile(templatePath);
  const templateCompiled = handlebars.compile(templateSource);
  const rendered = templateCompiled(merge({}, this.global, context));
  fs.ensureFileSync(path);
  fs.writeFileSync(path, rendered);
}

module.exports = page;
