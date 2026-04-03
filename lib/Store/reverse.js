import Store from '../Store.js';

/**
 * Gets a Store with the Records in reverse order
 * @returns {Store}
 */
function reverse() {
  return new Store(
    this.collection.reverse().all()
  );
}

export default reverse;
