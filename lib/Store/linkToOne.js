const errors = require('../errors.js');
const validateType = require('../tools/validateType.js');

/**
 * Creates a One to One relationship
 * @param {Store} relatedStore Store holding the related Records
 * @param {string} prop Property of the Record holding the related Record key
 */
function linkToOne(relatedStore, prop) {
  validateType('relatedStore', this.constructor, relatedStore);
  validateType('prop', 'string', prop);

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
