import errors from '../errors';
import getType from './getType';
import tryCatch from './tryCatch';
import validateType from './validateType';

/**
 * Checks if all items in the array are of the expected type
 * @param {string} name Name of the variable. Used in the error message
 * @param {mixed} expectedTypes
 * @param {array} arr Array of values to check the type of
 */
function validateTypeInArray(name, expectedTypes, arr) {
  validateType('arr', 'array', arr);

  arr.forEach((value) => {
    tryCatch(
      () => validateType(name, expectedTypes, value),
      () => errors.invalidTypeInArray(name, expectedTypes, getType(value))
    );
  });
}

export default validateTypeInArray;
