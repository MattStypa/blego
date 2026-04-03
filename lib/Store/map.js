import Record from '../Record.js';
import Store from '../Store';

/**
 * Gets a new Store with with Records modified by provided function while retaining the keys.
 * @param {function} fn
 * @returns {Store}
 */
function map(fn) {
  const records = this.collection.map((record) => {
    return new Record(record.key, fn(record));
  });

  return new Store(records.all());
}

export default map;
