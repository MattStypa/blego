/**
 * Tries to run a function. If it throws, the error function will be run.
 *
 * @alias module:tools.tryCatch
 * @param {function} func Function to run.
 * @param {function} [errorFunc] Function to run if the main function throws.
 */
function tryCatch(func, errorFunc = () => {}) {
  try {
    func();
  } catch(e) {
    errorFunc(e);
  }
}

module.exports = tryCatch;
