const throwingMock = require('./throwingMock.js');

module.exports = function(fn) {
  const original = process.exit;
  const mock = throwingMock;
  process.exit = mock;

  expect(fn).toThrow();

  process.exit = original;

  return mock;
}
