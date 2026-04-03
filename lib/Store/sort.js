import Store from '../Store';

/**
 * Gets a Store with Records sorted by the given function
 * @param {function} fn
 * @returns {Store}
 */
function sort(fn) {
  return new Store(
    this.collection.sort(fn).all()
  );
}

export default sort;
