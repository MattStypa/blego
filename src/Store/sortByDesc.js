const tools = require('../tools.js');

/**
 * Gets a new store sorted by specified record property is descending order. Uses natural language
 * sort.
 *
 * @instance
 * @memberof Store
 * @param {string} prop Record property to sort by.
 * @return {store}
 */
function sortByDesc(prop) {
  tools.validateType('prop', 'string', prop);

  let records = [...this.records];
  records.sort((a, b) => b[prop].toString().localeCompare(a[prop].toString(), undefined, {numeric: true}));

  return new this.constructor(records);
}

module.exports = sortByDesc;
