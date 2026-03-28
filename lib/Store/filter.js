/**
 * Gets a Store with Records that pass the given test
 * @param {function} fn Inclusion test
 * @returns {Store}
 */
function filter(fn) {
  return new this.constructor(
    this.collection.filter(fn).all()
  );
}

export default filter;
