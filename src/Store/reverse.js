/**
 * Gets Store with the Records in reverse order.
 *
 * @instance
 * @memberof Store
 * @return {Store}
 */
function reverse() {
  return new this.constructor(
    this.collection.reverse().all()
  );
}

module.exports = reverse;
