import throwingMock from './throwingMock.js';

export default function mockExit(fn) {
  const original = process.exit;
  const mock = throwingMock;
  process.exit = mock;

  expect(fn).toThrow();

  process.exit = original;

  return mock;
}
