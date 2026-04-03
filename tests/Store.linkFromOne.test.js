import { describe, it, expect, vi } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';
import errors from '../lib/errors.js';

describe('Store.linkFromOne', () => {
  const recordNotFoundSpy = vi.spyOn(errors, 'recordNotFound');
  const invalidTypeInArraySpy = vi.spyOn(errors, 'invalidTypeInArray');
  const recordLinkedSpy = vi.spyOn(errors, 'recordLinked');

  it('Creates a link to one Record from a different Store', () => {
    const fromStore = new Store([
      new Record('1', {links: 'a'}),
      new Record('2', {links: ['b', 'c']}),
      new Record('3', {links: undefined}),
    ]);

    const toStore = new Store([
      new Record('a', {}),
      new Record('b', {}),
      new Record('c', {}),
      new Record('d', {}),
    ]);

    toStore.linkFromOne(fromStore, 'links', 'link');

    expect(toStore.get('a').link).toBe(fromStore.get('1'));
    expect(toStore.get('b').link).toBe(fromStore.get('2'));
    expect(toStore.get('c').link).toBe(fromStore.get('2'));
    expect(toStore.get('d').link).toBe(undefined);
  });

  it('Can create a reverse link from linkToOne', () => {
    const fromStore = new Store([
      new Record('1', {link: 'a'}),
    ]);

    const toStore = new Store([
      new Record('a', {}),
      new Record('b', {}),
    ]);

    fromStore.linkToOne(toStore, 'link');
    toStore.linkFromOne(fromStore, 'link', 'link');

    expect(toStore.get('a').link).toBe(fromStore.get('1'));
    expect(toStore.get('b').link).toBe(undefined);
  });

  it('Can create a reverse link from linkToMany', () => {
    const fromStore = new Store([
      new Record('1', {link: ['a']}),
      new Record('2', {link: ['b', 'c']}),
    ]);

    const toStore = new Store([
      new Record('a', {}),
      new Record('b', {}),
      new Record('c', {}),
      new Record('d', {}),
    ]);

    fromStore.linkToMany(toStore, 'link');
    toStore.linkFromOne(fromStore, 'link', 'link');

    expect(toStore.get('a').link).toBe(fromStore.get('1'));
    expect(toStore.get('b').link).toBe(fromStore.get('2'));
    expect(toStore.get('c').link).toBe(fromStore.get('2'));
    expect(toStore.get('d').link).toBe(undefined);
  });

  it('Throws if a Record is missing', () => {
    const fromStore = new Store([
      new Record('1', {link: 'a'}),
    ]);

    const toStore = new Store([
      new Record('b', {}),
    ]);

    expect(() => {
      toStore.linkFromOne(fromStore, 'link', 'link');
    }).toThrow();

    expect(recordNotFoundSpy).toHaveBeenCalledWith('a', 'link', '1');
  });

  it('Throws if a related Record key is not a string', () => {
    const fromStore = new Store([
      new Record('1', {link: [1]}),
    ]);

    const toStore = new Store([
      new Record('a', {}),
    ]);

    expect(() => {
      toStore.linkFromOne(fromStore, 'link', 'link');
    }).toThrow();

    expect(invalidTypeInArraySpy).toHaveBeenCalledWith('link', 'string', '1');
  });

  it('Throws if the Record is already linked', () => {
    const fromStore = new Store([
      new Record('1', {link: 'a'}),
      new Record('2', {link: 'a'}),
    ]);

    const toStore = new Store([
      new Record('a', {}),
    ]);

    expect(() => {
      toStore.linkFromOne(fromStore, 'link', 'link');
    }).toThrow();

    expect(recordLinkedSpy).toHaveBeenCalledWith('a', 'link', '2', '1');
  });
});
