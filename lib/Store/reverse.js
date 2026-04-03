import Store, { internals } from '../Store.js';

/**
 * Gets a Store with the Records in reverse order
 * @returns {Store}
 */
function reverse() {
  return new Store(
    internals.get(this).collection.reverse().all()
  );
}

export default reverse;
