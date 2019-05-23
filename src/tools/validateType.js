const errors = require('./errors.js');
const getTypesString = require('./getTypesString.js');

/**
 * Checks if the variable is of expected type.
 * @alias module:tools.validateType
 * @param {string} name Name of the variable. Used in the error message.
 * @param {mixed} expectedTypes Expected type or types.
 * @param {mixed} value Value to check the type of.
 */
function validateType(name, expectedTypes, value) {
  let valid = false;
  const actualType = value === null ? 'null' : typeof(value);

  const expectedTypesArray = Array.isArray(expectedTypes) ? expectedTypes : [expectedTypes];

  expectedTypesArray.forEach((expectedType) => {
    typeof(expectedType) === 'string' && actualType === expectedType && (valid = true);
    typeof(expectedType) !== 'string' && value instanceof expectedType && (valid = true);
  });

  !valid && errors.invalidType(name, getTypesString(expectedTypes), actualType);
}

module.exports = validateType;
