const nodePath = require('path');
const handlebars = require('../handlebars.js');
const paths = require('../paths.js');
const tools = require('../tools.js');

/**
 * Registers Handlebars partial.
 * @instance
 * @memberof Blego
 * @param {string} name Name of the helper.
 * @param {string} templatePath Path to the template file.
 */
function partial(name, templatePath) {
  tools.validateType('name', 'string', name);
  tools.validateType('templatePath', 'string', templatePath);

  templatePath = tools.jailPath(templatePath);
  templatePath = nodePath.resolve(paths.partials, templatePath);

  const templateSource = tools.readFile(templatePath);

  handlebars.registerPartial(name, templateSource);
}

module.exports = partial;
