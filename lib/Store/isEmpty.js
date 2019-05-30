/**
 * Checks if the Store is empty.
 * @memberof Store
 * @return {boolean}
 */
function isEmpty() {
  return this.collection.isEmpty();
}

module.exports = isEmpty;
