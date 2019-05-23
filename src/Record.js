const merge = require('lodash.merge');
const tools = require('./tools.js');

/**
 * Creates a Record object.
 *
 * @constructor
 * @param {string} key Identifier of the Record.
 * @param {object} props Properites of the Record.
 */
function Record(key, props = {}) {
  tools.validateType('key', 'string', key);
  tools.validateType('props', Object, props);

  key = key.trim();
  !key && tools.errors.keyRequired();
  merge(this, props);
  this.key = key;
}

module.exports = Record;
