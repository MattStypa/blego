const tools = require('../tools.js');

/**
 * Gets a new store sorted by specified record property. Uses natural language sort.
 *
 * @instance
 * @memberof Store
 * @param {string} prop Record property to sort by.
 * @return {store}
 */
function sortBy(prop) {
  tools.validateType('prop', 'string', prop);

  let records = [...this.records];
  records.sort((a, b) => a[prop].toString().localeCompare(b[prop].toString(), undefined, {numeric: true}));

  return new this.constructor(records);
}

module.exports = sortBy;
