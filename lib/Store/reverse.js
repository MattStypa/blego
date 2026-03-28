/**
 * Gets a Store with the Records in reverse order
 * @returns {Store}
 */
function reverse() {
  return new this.constructor(
    this.collection.reverse().all()
  );
}

export default reverse;
