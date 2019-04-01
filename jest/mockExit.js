module.exports = function(fn) {
  const mock = jest.fn(() => { throw new Error() });
  const original = process.exit;
  process.exit = mock;

  expect(fn).toThrow();

  process.exit = original;

  return mock;
}
