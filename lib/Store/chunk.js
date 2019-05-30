/**
 * Gets an array of arrays of the requested size containing all the Records
 * @param {int} size Size of the child arrays
 * @return {array}
 */
function chunk(size) {
  return this.collection.chunk(size).toArray();
}

module.exports = chunk;
