/**
 * Checks if runnining under test.
 *
 * @private
 * @returns {boolean}
 */
function isTest() {
  return typeof __TEST__ !== 'undefined' && !!__TEST__;
}

module.exports = isTest
