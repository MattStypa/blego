import { describe, it, expect, vi } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';
import errors from '../lib/errors.js';

describe('Store.linkToMany', () => {
  const recordNotFoundSpy = vi.spyOn(errors, 'recordNotFound');

  it('Creates links to many Records from a different Store', () => {
    const fromStore = new Store([
      new Record('1', {links: ['a']}),
      new Record('2', {links: ['a', 'b']}),
      new Record('3', {links: null}),
    ]);

    const toStore = new Store([
      new Record('a', {}),
      new Record('b', {}),
    ]);

    fromStore.linkToMany(toStore, 'links');

    expect(fromStore.get('1').links.get('a')).toEqual(toStore.get('a'));
    expect(fromStore.get('2').links.get('a')).toEqual(toStore.get('a'));
    expect(fromStore.get('2').links.get('b')).toEqual(toStore.get('b'));
    expect(fromStore.get('3').links.count()).toEqual(0);
  });

  it('Throws if a Record is missing', () => {
    const fromStore = new Store([
      new Record('1', {links: ['a']}),
    ]);

    const toStore = new Store([
      new Record('b', {}),
    ]);

    expect(() => {
      fromStore.linkToMany(toStore, 'links');
    }).toThrow();

    expect(recordNotFoundSpy).toHaveBeenCalledWith('a', 'links', '1');
  });
});
