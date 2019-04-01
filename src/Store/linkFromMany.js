const errors = require('../errors.js');
const Record = require('../Record.js');
const tools = require('../tools.js');

/**
 * Creates a link from Records to many Records from a related Store.
 *
 * @instance
 * @memberof Store
 * @param {string} prop Property that will store the related Records.
 * @param {Store} relatedStore Store holding related Records.
 * @param {string} relatedProp Property of related Record that holds array of the keys of Records.
 */
function linkFromMany(prop, relatedStore, relatedProp) {
  tools.validateType('prop', 'string', prop);
  tools.validateType('relatedStore', this.constructor, relatedStore);
  tools.validateType('relatedProp', 'string', relatedProp);

  this.each((record) => record[prop] = []);

  relatedStore.each((record) => {
    const ref = record[relatedProp];

    if (!ref) return;

    tools.validateType(relatedProp, ['string', Array, Record], ref);

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
