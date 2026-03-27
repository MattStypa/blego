import { describe, it, expect, vi } from 'vitest';
import Record from '../lib/Record.js';
import errors from '../lib/errors.js';

describe('Record', () => {
  
  const keyRequiredSpy = vi.spyOn(errors, 'keyRequired');

  it('Creates a Record with key and props', () => {
    const record = new Record('key', {
      name: 'Blego',
    });

    expect(record).toEqual({
      key: 'key',
      name: 'Blego',
    });
  });

  it('Creates a Record without props', () => {
    const record = new Record('key');

    expect(record).toEqual({key: 'key'});
  });

  it('Throws if key is empty', () => {
    expect(() => {
      new Record('', {});
    }).toThrow();

    expect(keyRequiredSpy).toHaveBeenCalled();
  });
});
