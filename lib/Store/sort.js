/**
 * Gets a Store with Records sorted by the given function
 * @param {function} fn
 * @return {Store}
 */
function sort(fn) {
  return new this.constructor(
    this.collection.sort(fn).all()
  );
}

module.exports = sort;
