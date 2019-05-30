/**
 * Gets Store with Records that pass the given test.
 * @memberof Store
 * @param {function} fn Inclusion function.
 * @return {Store}
 */
function filter(fn) {
  return new this.constructor(
    this.collection.filter(fn).all()
  );
}

module.exports = filter;
