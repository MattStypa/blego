/**
 * Writes the records to the console and exists the process
 */
function dd() {
  this.collection.dd();
  process.exit(1);
}

module.exports = dd;
