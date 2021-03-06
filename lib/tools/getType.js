/**
 * Gets type of the provided variable
 * @param {mixed} variable
 * @returns {string}
 */
function getType(variable) {
  if (variable === null) return 'null';
  if (Array.isArray(variable)) return 'array';

  return typeof(variable);
}

module.exports = getType;
