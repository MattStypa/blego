const handlebars = require('../handlebars.js');
const validateType = require('../tools/validateType.js');

/**
 * Registers a Handlebars helper
 * @param {string} name Name of the helper
 * @param {function} fn Helper function
 */
function macro(name, fn) {
  validateType('name', 'string', name);
  validateType('fn', 'function', fn);

  handlebars.registerHelper(name, fn);
}

module.exports = macro;
