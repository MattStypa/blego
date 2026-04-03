import Store, { internals } from '../Store.js';

/**
 * Gets a new Store with the specified amount of Records.
 * @param {int} size
 * @returns {Store}
 */
function take(size) {
  return new Store(
    internals.get(this).collection.take(size).all()
  );
}

export default take;
