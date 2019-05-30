/**
 * Gets a Store with the Records that pass the given test
 * @param {function} fn Inclusion test function
 * @return {Store}
 */
function filter(fn) {
  return new this.constructor(
    this.collection.filter(fn).all()
  );
}

module.exports = filter;
