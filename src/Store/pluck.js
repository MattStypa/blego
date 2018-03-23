const collect = require('collect.js');
const tools = require('../tools.js');

/**
 * Gets an array of all used propery values.
 *
 * @instance
 * @memberof Store
 * @param {string} prop Record property to extract.
 * @return {store}
 */
function pluck(prop) {
  tools.validateType('prop', 'string', prop);

  let props = collect([]);

  this.collection.each((record) => record[prop] && (
    Array.isArray(record[prop]) ? props.concat(record[prop]) : props.push(record[prop])
  ));

  return props.all();
}

module.exports = pluck;
