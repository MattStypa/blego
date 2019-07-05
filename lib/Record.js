const merge = require('lodash.merge');
const errors = require('./errors.js');
const validateType = require('./tools/validateType.js');

/**
 * Record
 * @class
 * @param {string} key Identifier of the Record
 * @param {object} props Properites of the Record
 */
function Record(key, props = {}) {
  validateType('key', 'string', key);
  validateType('props', 'object', props);

  key = key.trim();
  !key && errors.keyRequired();
  merge(this, props);
  this.key = key;
}

module.exports = Record;
