/**
 * Dumps the records to the console.
 *
 * @instance
 * @memberof Store
 * @return {Store}
 */
function dump() {
  // collect.js native dump function does not work as intended. PR opened
  console.log(this.collection.all());

  return this;
}

module.exports = dump;
