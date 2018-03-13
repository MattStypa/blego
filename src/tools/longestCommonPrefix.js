/**
 * Gets a common prefix of two strings.
 *
 * @private
 * @param {string} first First string.
 * @param {string} second Second string.
 * @returns {string}
 */
function longestCommonPrefix(first, second) {
  for (let i = 0; i < Math.min(first.length, second.length); i++) {
    if (first[i] !== second[i]) {
      return first.substring(0, i);
    }
  }

  return first.length < second.length ? first : second;
}

module.exports = longestCommonPrefix;
