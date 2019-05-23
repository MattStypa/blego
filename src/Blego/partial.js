const nodePath = require('path');

/**
 * Registers Handlebars partial.
 *
 * @instance
 * @memberof Blego
 * @param {string} name Name of the helper.
 * @param {string} templatePath Path to the template file.
 */
function partial(name, templatePath) {
  this.tools.validateType('name', 'string', name);
  this.tools.validateType('templatePath', 'string', templatePath);

  templatePath = this.tools.jailPath(templatePath);
  templatePath = nodePath.resolve(this.internal.paths.partials, templatePath);

  const templateSource = this.tools.readFile(templatePath);

  this.handlebars.registerPartial(name, templateSource);
}

module.exports = partial;
