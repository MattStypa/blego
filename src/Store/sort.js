/**
 * Gets Store with Records sorted by the given function.
 *
 * @instance
 * @memberof Store
 * @param {function} fn Compare function.
 * @return {Store}
 */
function sort(fn) {
  return new this.constructor(
    this.collection.sort(fn).all()
  );
}

module.exports = sort;
