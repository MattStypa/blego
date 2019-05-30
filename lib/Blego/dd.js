/**
 * Writes data to the console and exits the process
 * @param {mixed} data
 */
function dd(...data) {
  console.log(...data);
  process.exit(1);
}

module.exports = dd;
