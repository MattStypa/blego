/**
 * Gets a Store with Records sorted by the given prop
 * @param {string|function} prop Property name or function that returns a value to sort by
 * @return {Store}
 */
function sortBy(prop) {
  return new this.constructor(
    this.collection.sortBy(prop).all()
  );
}

module.exports = sortBy;
