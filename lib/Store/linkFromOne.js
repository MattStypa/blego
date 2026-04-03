import Store from '../Store.js';
import Record from '../Record.js';
import errors from '../errors.js';
import validateType from '../tools/validateType.js';

/**
 * Creates a One to One relationship using keys from related store
 * @param {Store} relatedStore Store holding the related Records
 * @param {string} relatedProp Property of the related Record holding the Record key
 * @param {string} prop Property that will store the related Record
 */
function linkFromOne(relatedStore, relatedProp, prop) {
  validateType('relatedStore', this.constructor, relatedStore);
  validateType('relatedProp', 'string', relatedProp);
  validateType('prop', 'string', prop);

  const linksByRef = {};

  relatedStore.each((record) => {
    const ref = record[relatedProp];

    if (!ref) return;

    validateType(relatedProp, ['string', Array, Store, Record], ref);

    const refs = [];

    if (ref instanceof Store) {
      refs.push(...ref.all());
    } else if (Array.isArray(ref)) {
      refs.push(...ref);
    } else {
      refs.push(ref);
    }

    refs.forEach((ref) => {
      if (ref instanceof Record) {
        linksByRef[ref.key] = record;
        return;
      }

      typeof(ref) !== 'string' && errors.invalidTypeInArray(relatedProp, 'string', record.key);

      const link = this.get(ref);
      !link && errors.recordNotFound(ref, prop, record.key);
      linksByRef[ref] && errors.recordLinked(ref, prop, record.key, linksByRef[ref].key);
      linksByRef[ref] = record;
    });
  });

  this.each((record) => record[prop] = linksByRef[record.key] || undefined);
}

export default linkFromOne;
