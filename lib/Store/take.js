/**
 * Gets an array of Records of given size
 * @param {int} size
 * @return {array}
 */
function take(size) {
  return this.collection.take(size).all();
}

module.exports = take;
