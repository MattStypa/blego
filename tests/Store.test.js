import { describe, it, expect, vi } from 'vitest';
import Record from '../lib/Record';
import Store from '../lib/Store';
import errors from '../lib/errors';

describe('Store', () => {
  const invalidTypeInArraySpy = vi.spyOn(errors, 'invalidTypeInArray');
  const recordKeyDupeSpy = vi.spyOn(errors, 'recordKeyDupe');

  it('Creates a store from Records', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    expect(store.count()).toEqual(3);
  });

  it('Throws if object is not a Record', () => {
    expect(() => {
      new Store([
        {}
      ]);
    }).toThrow();

    expect(invalidTypeInArraySpy).toHaveBeenCalled();
  });

  it('Thorws if duplicate keys exists', () => {
    expect(() => {
      new Store([
        new Record('1', {}),
        new Record('1', {}),
      ]);
    }).toThrow();

    expect(recordKeyDupeSpy).toHaveBeenCalled();
  });
});
