/**
 * Gets all Records from the Store.
 * @instance
 * @memberof Store
 * @return {array}
 */
function all() {
  return this.collection.all();
}

module.exports = all;
