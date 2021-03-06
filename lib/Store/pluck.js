const collect = require('collect.js');
const validateType = require('../tools/validateType.js');

/**
 * Gets all of the values for a given property
 * @param {string} prop Record property to extract
 * @return {array}
 */
function pluck(prop) {
  validateType('prop', 'string', prop);

  let props = collect([]);

  this.collection.each((record) => record[prop] && (
    Array.isArray(record[prop])
      ? (props = props.concat(record[prop]))
      : props.push(record[prop])
  ));

  return props.all();
}

module.exports = pluck;
