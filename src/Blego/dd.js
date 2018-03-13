/**
 * Writes data to console and exits the process.
 *
 * @instance
 * @memberof Blego
 * @param {mixed} data Data to write to console.
 */
function dd(data) {
  console.log(data);
  process.exit(1);
}

module.exports = dd;
