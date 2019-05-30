const errors = require('../errors.js');
const validateType = require('../tools/validateType.js');
const validateTypeInArray = require('../tools/validateTypeInArray.js');

/**
 * Creates a link from Records to many Records in a related Store
 * @param {string} prop Property of the Record holding the related Record keys
 * @param {Store} relatedStore Store holding related Records
 */
function linkToMany(prop, relatedStore) {
  validateType('prop', 'string', prop);
  validateType('relatedStore', this.constructor, relatedStore);

  this.each((record) => {
    const refs = record[prop];
    record[prop] = [];

    if (!refs) return;

    validateTypeInArray(prop, 'string', refs);

    refs.forEach((ref) => {
      const link = relatedStore.get(ref);
      !link && errors.recordNotFound(ref, prop, record.key);
      record[prop].push(link);
    });
  });
}

module.exports = linkToMany;
