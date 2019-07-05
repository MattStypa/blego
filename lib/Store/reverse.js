/**
 * Gets a Store with the Records in reverse order
 * @return {Store}
 */
function reverse() {
  return new this.constructor(
    this.collection.reverse().all()
  );
}

module.exports = reverse;
