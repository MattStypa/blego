import Store, { internals } from '../Store.js';

/**
 * Gets an array of Stores of the specified size. If the Store can't be split evenly, the final chunk will be the
 * remaining Records.
 * @param {int} size Size of the child arrays
 * @returns {array}
 */
function chunk(size) {
  return internals.get(this).collection.chunk(size).map((item) => {
    return new Store(item.all());
  }).all();
}

export default chunk;
