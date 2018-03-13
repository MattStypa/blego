/**
 * Gets all records as an object with record keys as properties and records as values.
 *
 * @instance
 * @memberof Store
 * @return {object}
 */
function cast() {
  let data = {};
  this.each((record) => data[record.key] = record);

  return data;
}

module.exports = cast;
