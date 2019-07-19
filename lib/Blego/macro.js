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

  // Registered helpers receive additional data about the caller as the last argument.
  handlebars.registerHelper(name, (...args) => fn(...args.slice(0, -1)));
}

module.exports = macro;
