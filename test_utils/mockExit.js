import { expect } from 'vitest';
import throwingMock from './throwingMock';

export default function mockExit(fn) {
  const original = process.exit;
  const mock = throwingMock;
  process.exit = mock;

  expect(fn).toThrow();

  process.exit = original;

  return mock;
}
