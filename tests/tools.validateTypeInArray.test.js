import { describe, it, expect, vi } from 'vitest';
import errors from '../lib/errors';
import validateTypeInArray from '../lib/tools/validateTypeInArray';

describe('tools.validateTypeInArray', () => {
  const invalidTypeInArraySpy = vi.spyOn(errors, 'invalidTypeInArray');

  it('Validates types', () => {
    expect(() => {
      validateTypeInArray(null, 'null', [null, null]);
      validateTypeInArray(null, 'string', ['abc', 'def']);
      validateTypeInArray(null, 'number', [123, 456]);
      validateTypeInArray(null, 'array', [[], []]);
      validateTypeInArray(null, 'object', [{}, {}]);
    }).not.toThrow();
  });

  it('Validates against array of types', () => {
    expect(() => {
      validateTypeInArray(null, ['null', 'string', 'number'], [null, 'abc', 123]);
    }).not.toThrow();
  });

  it('Throws if the type is invalid', () => {
    expect(() => {
      validateTypeInArray('argument', 'number', ['abc']);
    }).toThrow();

    expect(invalidTypeInArraySpy).toHaveBeenCalledWith('argument', 'number', 'string');
  });

  it('Throws if the type is not in the array of types', () => {
    expect(() => {
      validateTypeInArray('argument', ['null', 'array'], [{}]);
    }).toThrow();

    expect(invalidTypeInArraySpy).toHaveBeenCalledWith('argument', ['null', 'array'], 'object');
  });
});
