const errors = require('../errors.js');
const validateType = require('../tools/validateType.js');

/**
 * Creates a link from Records to one Record from a related Store
 * @param {string} prop Property that holds the key of a Record from the related Store
 * @param {Store} relatedStore Store holding the related Records
 */
function linkToOne(prop, relatedStore) {
  validateType('prop', 'string', prop);
  validateType('relatedStore', this.constructor, relatedStore);

  this.each((record) => {
    const ref = record[prop];
    record[prop] = undefined;

    if (!ref) return;

    validateType(prop, 'string', ref);

    const link = relatedStore.get(ref);
    !link && errors.recordNotFound(ref, prop, record.key);
    record[prop] = link;
  });
}

module.exports = linkToOne;
