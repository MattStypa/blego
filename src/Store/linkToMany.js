const tools = require('../tools.js');

/**
 * Creates a link from Records to many Records from a related Store.
 *
 * @instance
 * @memberof Store
 * @param {string} prop Property that holds the array of keys of Records from related Store.
 * @param {Store} relatedStore Store holding related Records.
 */
function linkToMany(prop, relatedStore) {
  tools.validateType('prop', 'string', prop);
  tools.validateType('relatedStore', this.constructor, relatedStore);

  this.each((record) => {
    const refs = record[prop];
    record[prop] = [];

    if (!refs) return;

    tools.validateTypeInArray(prop, 'string', refs);

    refs.forEach((ref) => {
      const link = relatedStore.get(ref);
      !link && tools.errors.recordNotFound(ref, prop, record.key);
      record[prop].push(link);
    });
  });
}

module.exports = linkToMany;
