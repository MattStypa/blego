const Record = require('../Record.js');
const errors = require('../errors.js');
const validateType = require('../tools/validateType.js');

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

  this.each((record) => record[prop] = []);

  relatedStore.each((record) => {
    const ref = record[relatedProp];

    if (!ref) return;

    validateType(relatedProp, ['string', Array, Record], ref);

    const refs = Array.isArray(ref) ? ref : [ref];

    refs.forEach((ref) => {
      if (ref instanceof Record) {
        ref[prop].push(record);
        return;
      }

      typeof(ref) !== 'string' && errors.invalidTypeInArray(relatedProp, 'string', record.key);

      const link = this.get(ref);
      !link && errors.recordNotFound(ref, prop, record.key);
      link[prop].push(record);
    });
  });
}

module.exports = linkFromMany;
