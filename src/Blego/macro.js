const handlebars = require('handlebars');

/**
 * Registers Handlebars helper.
 *
 * @instance
 * @memberof Blego
 * @param {string} name Name of the helper.
 * @param {function} func Helper function.
 */
function macro(name, func) {
  this.tools.validateType('name', 'string', name);
  this.tools.validateType('func', 'function', func);

  handlebars.registerHelper(name, func);
}

module.exports = macro;
