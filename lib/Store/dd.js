/**
 * Dumps the records to the console and exists the process.
 * @memberof Store
 */
function dd() {
  this.collection.dd();
  process.exit(1);
}

module.exports = dd;
