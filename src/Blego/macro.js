const handlebars = require('handlebars');

/**
 * Registers Handlebars helper.
 *
 * @instance
 * @memberof Blego
 * @param {string} name Name of the helper.
 * @param {function} fn Helper function.
 */
function macro(name, fn) {
  this.tools.validateType('name', 'string', name);
  this.tools.validateType('fn', 'function', fn);

  handlebars.registerHelper(name, fn);
}

module.exports = macro;
