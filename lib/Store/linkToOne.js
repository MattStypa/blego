import errors from '../errors.js';
import validateType from '../tools/validateType.js';

/**
 * Creates a One to One relationship
 * @param {Store} relatedStore Store holding the related Records
 * @param {string} prop Property of the Record holding the related Record key
 */
function linkToOne(relatedStore, prop) {
  validateType('relatedStore', this.constructor, relatedStore);
  validateType('prop', 'string', prop);

  const keyedRelatedStore = relatedStore.keyed();

  this.each((record) => {
    const ref = record[prop];
    record[prop] = undefined;

    if (!ref) return;

    validateType(prop, 'string', ref);

    const link = keyedRelatedStore[ref];
    !link && errors.recordNotFound(ref, prop, record.key);
    record[prop] = link;
  });
}

export default linkToOne;
