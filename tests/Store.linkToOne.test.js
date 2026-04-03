import { describe, it, expect, vi } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';
import errors from '../lib/errors.js';

describe('Store.linkToOne', () => {
  const recordNotFoundSpy = vi.spyOn(errors, 'recordNotFound');

  it('Creates a link to one Record from a different Store', () => {
    const fromStore = new Store([
      new Record('1', {link: 'a'}),
      new Record('2', {link: null}),
    ]);

    const toStore = new Store([
      new Record('a', {}),
    ]);

    fromStore.linkToOne(toStore, 'link');

    expect(fromStore.get('1').link).toBe(toStore.get('a'));
    expect(fromStore.get('2').link).toBe(undefined);
  });

  it('Throws if a Record is missing', () => {
    const fromStore = new Store([
      new Record('1', {link: 'a'}),
    ]);

    const toStore = new Store([
      new Record('b', {}),
    ]);

    expect(() => {
      fromStore.linkToOne(toStore, 'link');
    }).toThrow();

    expect(recordNotFoundSpy).toHaveBeenCalledWith('a', 'link', '1');
  });
});
