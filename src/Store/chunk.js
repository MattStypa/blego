const _ = require('lodash');
const tools = require('../tools.js');

/**
 * Gets all records broken down into arrays of specified size.
 *
 * @instance
 * @memberof Store
 * @param {integer} size Desired size of the chunks.
 * @return {array}
 */
function chunk(size) {
  tools.validateType('size', 'number', size);

  return _.chunk(this.records, size);
}

module.exports = chunk;
