const validateType = require('./validateType.js');

/**
 * Tries to run a function. If it throws, the error function will be run.
 * @param {function} fn Function to run.
 * @param {function} [errorFn] Function to run if the main function throws.
 */
function tryCatch(fn, errorFn = () => {}) {
  validateType('fn', 'function', fn);
  validateType('errorFn', 'function', errorFn);

  try {
    fn();
  } catch(e) {
    errorFn(e);
  }
}

module.exports = tryCatch;
