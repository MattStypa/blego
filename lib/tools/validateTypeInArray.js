const errors = require('../errors.js');
const getTypesString = require('./getTypesString.js');
const tryCatch = require('./tryCatch.js');
const validateType = require('./validateType.js');

/**
 * Checks if all items in the array are of expected type.
 * @alias module:tools.validateTypeInArray
 * @param {string} name Name of the variable. Used in the error message.
 * @param {mixed} expectedTypes Expected type or types.
 * @param {array} arr Array of values to check the type of.
 */
function validateTypeInArray(name, expectedTypes, arr) {
  validateType('arr', Array, arr);

  arr.forEach((value) => {
    const actualType = value === null ? 'null' : typeof(value);

    tryCatch(
      () => validateType(name, expectedTypes, value),
      () => errors.invalidTypeInArray(name, getTypesString(expectedTypes), actualType)
    );
  });
}

module.exports = validateTypeInArray;
