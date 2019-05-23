/**
 * Gets the count of Records in the Store.
 * @instance
 * @memberof Store
 * @return {int}
 */
function count() {
  return this.collection.count();
}

module.exports = count;
