/**
 * Gets array of Records of given size.
 * @memberof Store
 * @param {int} size Size of the arrays.
 * @return {array}
 */
function take(size) {
  return this.collection.take(size).all();
}

module.exports = take;
