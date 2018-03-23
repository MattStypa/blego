const collect = require('collect.js');
const tools = require('../tools.js');

/**
 * Gets an unique array of all used propery values.
 *
 * @instance
 * @memberof Store
 * @param {string} prop Record property to extract.
 * @return {store}
 */
function pluckUnique(prop) {
  tools.validateType('prop', 'string', prop);

  let props = collect([]);

  this.collection.each((record) => record[prop] && (
    Array.isArray(record[prop]) ? props.concat(record[prop]) : props.push(record[prop])
  ));

  return props.unique().all();
}

module.exports = pluckUnique;
