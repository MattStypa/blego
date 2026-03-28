/**
 * Writes the records to the console
 * @returns {Store}
 */
function dump() {
  this.collection.dump();

  return this;
}

export default dump;
