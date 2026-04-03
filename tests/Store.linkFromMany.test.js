import { describe, it, expect, vi } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';
import errors from '../lib/errors.js';

describe('Store.linkFromMany', () => {
  const recordNotFoundSpy = vi.spyOn(errors, 'recordNotFound');
  const invalidTypeInArraySpy = vi.spyOn(errors, 'invalidTypeInArray');

  it('Creates links to many Records from a different Store', () => {
    const fromStore = new Store([
      new Record('1', { links: 'a' }),
      new Record('2', { links: ['a', 'b'] }),
      new Record('3', { links: undefined }),
    ]);

    const toStore = new Store([
      new Record('a', {}),
      new Record('b', {}),
      new Record('c', {}),
    ]);

    toStore.linkFromMany(fromStore, 'links', 'links');

    expect(toStore.get('a').links.get('1')).toBe(fromStore.get('1'));
    expect(toStore.get('a').links.get('2')).toBe(fromStore.get('2'));
    expect(toStore.get('b').links.get('2')).toBe(fromStore.get('2'));
    expect(toStore.get('c').links.count()).toEqual(0);
  });

  it('Can create a reverse link from linkToOne', () => {
    const fromStore = new Store([
      new Record('1', { link: 'a' }),
      new Record('2', { link: 'b' }),
      new Record('3', { link: 'b' }),
    ]);

    const toStore = new Store([
      new Record('a', {}),
      new Record('b', {}),
      new Record('c', {}),
    ]);

    fromStore.linkToOne(toStore, 'link');
    toStore.linkFromMany(fromStore, 'link', 'links');

    expect(toStore.get('a').links.get('1')).toBe(fromStore.get('1'));
    expect(toStore.get('b').links.get('2')).toBe(fromStore.get('2'));
    expect(toStore.get('b').links.get('3')).toBe(fromStore.get('3'));
    expect(toStore.get('c').links.count()).toEqual(0);
  });

  it('Can create a reverse link from linkToMany', () => {
    const fromStore = new Store([
      new Record('1', { links: ['a'] }),
      new Record('2', { links: ['a', 'b'] }),
    ]);

    const toStore = new Store([
      new Record('a', {}),
      new Record('b', {}),
      new Record('c', {}),
    ]);

    fromStore.linkToMany(toStore, 'links');
    toStore.linkFromMany(fromStore, 'links', 'links');

    expect(toStore.get('a').links.get('1')).toBe(fromStore.get('1'));
    expect(toStore.get('a').links.get('2')).toBe(fromStore.get('2'));
    expect(toStore.get('b').links.get('2')).toBe(fromStore.get('2'));
    expect(toStore.get('c').links.count()).toEqual(0);
  });

  it('Throws if a Record is missing', () => {
    const fromStore = new Store([
      new Record('1', { links: ['a'] }),
    ]);

    const toStore = new Store([
      new Record('b', {}),
    ]);

    expect(() => {
      toStore.linkFromMany(fromStore, 'links', 'links');
    }).toThrow();

    expect(recordNotFoundSpy).toHaveBeenCalledWith('a', 'links', '1');
  });

  it('Throws if a related Record key is not a string', () => {
    const fromStore = new Store([
      new Record('1', { links: [1] }),
    ]);

    const toStore = new Store([
      new Record('a', {}),
    ]);

    expect(() => {
      toStore.linkFromMany(fromStore, 'links', 'links');
    }).toThrow();

    expect(invalidTypeInArraySpy).toHaveBeenCalledWith('links', 'string', '1');
  });
});
