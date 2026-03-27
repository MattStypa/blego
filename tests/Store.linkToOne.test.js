import { describe, it, expect, vi } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';
import errors from '../lib/errors.js';

describe('Store.linkToOne', () => {
  const recordNotFoundSpy = vi.spyOn(errors, 'recordNotFound');

  it('Creates a link to one Record from a different Store', () => {
    const fromStore = new Store([
      new Record('1', {link: 'c'}),
      new Record('2', {link: 'b'}),
      new Record('3', {link: 'a'}),
      new Record('4', {link: null}),
    ]);
    const toStore = new Store([
      new Record('a', {}),
      new Record('b', {}),
      new Record('c', {}),
    ]);

    fromStore.linkToOne(toStore, 'link');

    expect(fromStore.get('1').link.key).toEqual('c');
    expect(fromStore.get('2').link.key).toEqual('b');
    expect(fromStore.get('3').link.key).toEqual('a');
    expect(fromStore.get('4').link).toEqual(undefined);
  });

  it('Throws if a Record is mising', () => {
    const fromStore = new Store([
      new Record('1', {link: 'b'}),
    ]);
    const toStore = new Store([
      new Record('a', {}),
    ]);

    expect(() => {
      fromStore.linkToOne(toStore, 'link');
    }).toThrow();

    expect(recordNotFoundSpy).toHaveBeenCalledWith('b', 'link', '1');
  });
});
