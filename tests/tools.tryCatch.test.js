import { describe, it, expect, vi } from 'vitest';
import tryCatch from '../lib/tools/tryCatch.js';
import throwingMock from '../test_utils/throwingMock.js';

describe('tools.tryCatch', () => {
  it('runs the main function', () => {
    const func = vi.fn();
    const errorFunc = vi.fn();

    tryCatch(func, errorFunc);

    expect(func).toHaveBeenCalled();
    expect(errorFunc).not.toHaveBeenCalled();
  });

  it('Runs the error function if the main function throws', () => {
    const errorFunc = vi.fn();

    tryCatch(throwingMock, errorFunc);

    expect(throwingMock).toHaveBeenCalled();
    expect(errorFunc).toHaveBeenCalled();
  });

  it('Does not require the error function', () => {
    expect(() => {
      tryCatch(throwingMock);
    }).not.toThrow();
  });
});
