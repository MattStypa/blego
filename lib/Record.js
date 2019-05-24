const merge = require('lodash.merge');
const errors = require('./errors.js');
const tools = require('./tools.js');

/**
 * Record object.
 * @class
 * @param {string} key Identifier of the Record.
 * @param {object} props Properites of the Record.
 */
function Record(key, props = {}) {
  tools.validateType('key', 'string', key);
  tools.validateType('props', Object, props);

  key = key.trim();
  !key && errors.keyRequired();
  merge(this, props);
  this.key = key;
}

module.exports = Record;
