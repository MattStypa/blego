import Store from '../Store.js';

/**
 * Gets a new Store with the specified amount of Records.
 * @param {int} size
 * @returns {Store}
 */
function take(size) {
  return new Store(
    this.collection.take(size).all()
  );
}

export default take;
