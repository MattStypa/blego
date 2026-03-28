/**
 * Gets an array of Records of given size
 * @param {int} size
 * @returns {array}
 */
function take(size) {
  return this.collection.take(size).all();
}

export default take;
