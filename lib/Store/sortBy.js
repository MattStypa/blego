import Store from '../Store';

/**
 * Gets a Store with Records sorted by the given prop
 * @param {string|function} prop Property name or function that returns a value to sort by
 * @returns {Store}
 */
function sortBy(prop) {
  return new Store(
    this.collection.sortBy(prop).all()
  );
}

export default sortBy;
