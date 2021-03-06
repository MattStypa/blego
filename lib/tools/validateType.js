const errors = require('../errors.js');
const getType = require('./getType.js');

/**
 * Checks if the variable is of the expected type
 * @param {string} name Name of the variable. Used in the error message
 * @param {mixed} expectedTypes
 * @param {mixed} value
 */
function validateType(name, expectedTypes, value) {
  let valid = false;
  const actualType = getType(value);
  const expectedTypesArray = Array.isArray(expectedTypes) ? expectedTypes : [expectedTypes];

  expectedTypesArray.forEach((expectedType) => {
    typeof(expectedType) === 'string' && actualType === expectedType && (valid = true);
    typeof(expectedType) !== 'string' && value instanceof expectedType && (valid = true);
  });

  valid || errors.invalidType(name, expectedTypes, actualType);
}

module.exports = validateType;
