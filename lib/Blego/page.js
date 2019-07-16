const nodePath = require('path');
const fs = require('fs-extra');
const merge = require('lodash.merge');
const errors = require('../errors.js');
const handlebars = require('../handlebars.js');
const paths = require('../paths.js');
const exists = require('../tools/exists.js');
const jailPath = require('../tools/jailPath.js');
const tryCatch = require('../tools/tryCatch.js');
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
  path = nodePath.resolve(paths.dest, path);
  exists(path) && errors.pathExists(path);

  tryCatch(
    () => renderTemplate(path, templatePath, context),
    (e) => errors.handlebars(e)
  );
}

/**
 * Renders a compiled Handlebars template to a file
 * @param {string} path Relative path to the rendered file
 * @param {string} templatePath Relative path to the template file
 * @param {object} context Data available in the template
 */
function renderTemplate(path, templatePath, context) {
  const templateCompiled = handlebars.compile(`{{> ${templatePath}}}`);
  const rendered = templateCompiled(merge({}, this.global, context));

  fs.ensureFileSync(path);
  fs.writeFileSync(path, rendered);
}

module.exports = page;
