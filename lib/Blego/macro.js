const handlebars = require('../handlebars.js');
const tools = require('../tools.js');

/**
 * Registers Handlebars helper.
 * @instance
 * @memberof Blego
 * @param {string} name Name of the helper.
 * @param {function} fn Helper function.
 */
function macro(name, fn) {
  tools.validateType('name', 'string', name);
  tools.validateType('fn', 'function', fn);

  handlebars.registerHelper(name, fn);
}

module.exports = macro;
