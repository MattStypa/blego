/**
 * Dumps the records to the console.
 *
 * @instance
 * @memberof Store
 * @return {Store}
 */
function dump() {
  return this.collection.dump();
}

module.exports = dump;
