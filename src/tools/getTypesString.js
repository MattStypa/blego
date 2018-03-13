/**
 * Converts type or array of types to a comma seperated string representation.
 *
 * @private
 * @param {mixed} types Type or types to be converted to a string representation.
 * @returns {string}
 */
function getTypesString(types) {
  const typesArray = Array.isArray(types) ? types : [types];
  let typeNames = typesArray.map(getTypeName);
  const lastTypeName = typeNames.pop();

  return !typeNames.length ? lastTypeName : [typeNames.join(', '), 'or', lastTypeName].join(' ');
}

/**
 * Converts type to a string representation.
 *
 * @private
 * @param {mixed} type Type to be converted to a string representation.
 * @returns {string}
 */
function getTypeName(type) {
  return typeof(type) === 'string' ? type.toLowerCase() : type.name.toLowerCase();
}

module.exports = getTypesString;
