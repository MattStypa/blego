/**
 * Imports a file synchronously
 * @param {string} path
 * @returns {object}
 */
function importSync(path) {
  return require(path);
}

module.exports = importSync;
