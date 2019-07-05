const nodePath = require('path');
const handlebars = require('../handlebars.js');
const paths = require('../paths.js');
const jailPath = require('../tools/jailPath.js');
const readFile = require('../tools/readFile.js');
const validateType = require('../tools/validateType.js');

/**
 * Registers a Handlebars partial
 * @param {string} name Name of the partial
 * @param {string} templatePath Path to the template file
 */
function partial(name, templatePath) {
  validateType('name', 'string', name);
  validateType('templatePath', 'string', templatePath);

  templatePath = jailPath(templatePath);
  templatePath = nodePath.resolve(paths.partials, templatePath);

  const templateSource = readFile(templatePath);

  handlebars.registerPartial(name, templateSource);
}

module.exports = partial;
