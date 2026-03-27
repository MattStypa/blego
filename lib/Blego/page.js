import nodePath from 'path';
import fs from 'fs-extra';
import handlebars from 'handlebars';
import merge from 'lodash.merge';
import errors from '../errors';
import paths from '../paths';
import exists from '../tools/exists';
import jailPath from '../tools/jailPath';
import tryCatch from '../tools/tryCatch';
import validateType from '../tools/validateType';

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
    () => renderTemplate(path, templatePath, merge({}, this.global, context)),
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
  const rendered = templateCompiled(context);

  fs.ensureFileSync(path);
  fs.writeFileSync(path, rendered);
}

export default page;
