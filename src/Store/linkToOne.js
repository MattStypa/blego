const errors = require('../errors.js');
const Record = require('../Record.js');
const tools = require('../tools.js');

/**
 * Creates a link from Records to one Record from a related Store.
 *
 * @instance
 * @memberof Store
 * @param {string} prop Property that holds the key of a Record from related Store.
 * @param {Store} relatedStore Store holding related Records.
 */
function linkToOne(prop, relatedStore) {
  tools.validateType('prop', 'string', prop);
  tools.validateType('relatedStore', this.constructor, relatedStore);

  this.each((record) => {
    const ref = record[prop];
    record[prop] = undefined;

    if (!ref) return;

    tools.validateType(prop, 'string', ref);

    const link = relatedStore.get(ref);
    !link && errors.recordNotFound(ref, prop, record.key);
    record[prop] = link;
  });
}

module.exports = linkToOne;
