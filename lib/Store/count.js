/**
 * Gets the count of Records in the Store
 * @return {int}
 */
function count() {
  return this.collection.count();
}

export default count;
