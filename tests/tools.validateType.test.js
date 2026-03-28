import { describe, it, expect, vi } from 'vitest';
import errors from '../lib/errors.js';
import validateType from '../lib/tools/validateType.js';

describe('tools.validateType', () => {
  const invalidTypeSpy = vi.spyOn(errors, 'invalidType');

  it('Validates types', () => {
    expect(() => {
      validateType(null, 'null', null);
      validateType(null, 'string', 'abc');
      validateType(null, 'number', 123);
      validateType(null, 'array', []);
      validateType(null, 'object', {});
      validateType(null, 'function', () => {});
      validateType(null, Array, []);
      validateType(null, Object, {});
    }).not.toThrow();
  });

  it('Validates against array of types', () => {
    expect(() => {
      validateType(null, ['null', 'string', 'number'], null);
      validateType(null, ['null', 'string', 'number'], 'abc');
      validateType(null, ['null', 'string', 'number'], 123);
    }).not.toThrow();
  });

  it('Throws if the type is invalid', () => {
    expect(() => {
      validateType('argument', 'number', 'abc');
    }).toThrow();

    expect(invalidTypeSpy).toHaveBeenCalledWith('argument', 'number', 'string');
  });

  it('Throws if the type is not in the array of types', () => {
    expect(() => {
      validateType('argument', ['null', 'array'], {});
    }).toThrow();

    expect(invalidTypeSpy).toHaveBeenCalledWith('argument', ['null', 'array'], 'object');
  });
});
