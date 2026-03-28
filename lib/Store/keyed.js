/**
 * Gets an object representation of the Store
 * @returns {object}
 */
function keyed() {
  return this.collection.keyBy('key').all();
}

export default keyed;
