module.exports = function(implementation = () => {}) {
  const mock = jest.fn(implementation);
  const original = process.exit;
  process.exit = mock;

  function restore() {
    process.exit = original;
  }

  return [restore, mock];
}
