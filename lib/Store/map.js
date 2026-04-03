import Record from '../Record.js';

/**
 * Gets a new Store with with Records modified by provided function while retaining the keys.
 * @param {function} fn
 * @returns {Store}
 */
function map(fn) {
  const records = this.collection.map((record) => {
    return new Record(record.key, fn(record));
  });

  return new this.constructor(records.all());
}

export default map;
