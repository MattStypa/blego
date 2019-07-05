/**
 * Gets array of Records processed by the given function
 * @param {function} fn
 * @return {array}
 */
function map(fn) {
  return this.collection.map(fn).all();
}

module.exports = map;
