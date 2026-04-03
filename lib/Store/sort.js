import Store, { internals } from '../Store.js';

/**
 * Gets a Store with Records sorted by the given function
 * @param {function} fn
 * @returns {Store}
 */
function sort(fn) {
  return new Store(
    internals.get(this).collection.sort(fn).all()
  );
}

export default sort;
