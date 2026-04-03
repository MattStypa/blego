import Store from '../Store.js';
import Record from '../Record.js';
import errors from '../errors.js';
import validateType from '../tools/validateType.js';

/**
 * Creates a One to Many relationship using keys from related store
 * @param {Store} relatedStore Store holding the related Records
 * @param {string} relatedProp Property of the related Record holding the Record keys
 * @param {string} prop Property that will store the related Records
 */
function linkFromMany(relatedStore, relatedProp, prop) {
  validateType('relatedStore', this.constructor, relatedStore);
  validateType('relatedProp', 'string', relatedProp);
  validateType('prop', 'string', prop);

  const linksByRef = {};
  const addLinkByRef = (ref, link) => linksByRef[ref] ? linksByRef[ref].push(link) : linksByRef[ref] = [link];

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
        addLinkByRef(ref.key, record);
        return;
      }

      typeof(ref) !== 'string' && errors.invalidTypeInArray(relatedProp, 'string', record.key);

      const link = this.get(ref);
      !link && errors.recordNotFound(ref, prop, record.key);
      addLinkByRef(ref, record);
    });
  });

  this.each((record) => record[prop] = new Store(linksByRef[record.key] || []));
}

export default linkFromMany;
