import errors from '../errors.js';
import validateType from '../tools/validateType.js';
import validateTypeInArray from '../tools/validateTypeInArray.js';

/**
 * Creates a One to Many relationship
 * @param {Store} relatedStore Store holding related Records
 * @param {string} prop Property of the Record holding the related Record keys
 */
function linkToMany(relatedStore, prop) {
  validateType('relatedStore', this.constructor, relatedStore);
  validateType('prop', 'string', prop);

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

export default linkToMany;
