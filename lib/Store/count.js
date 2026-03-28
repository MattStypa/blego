/**
 * Gets the count of Records in the Store
 * @returns {int}
 */
function count() {
  return this.collection.count();
}

export default count;
