const validateType = require('../tools/validateType.js');

/**
 * Gets a Store with Records having the given property equal to specified value
 * @param {string} prop Record property to check
 * @param {mixed} value Desired value of the property
 * @return {store}
 */
function where(prop, value) {
  validateType('prop', 'string', prop);

  const records = this.collection.filter((record) => {
    return Array.isArray(record[prop])
      ? record[prop].includes(value)
      : record[prop] === value;
  });

  return new this.constructor(records.all());
}

module.exports = where;
