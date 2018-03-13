const tools = require('../tools.js');

/**
 * Gets a record with the specified key.
 *
 * @instance
 * @memberof Store
 * @param {string} key Identifier of a record.
 * @return {record}
 */
function get(key) {
  tools.validateType('key', 'string', key);

  return this.records.find((record) => record.key === key);
}

module.exports = get;
