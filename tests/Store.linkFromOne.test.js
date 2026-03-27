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
      new Record('1', {link: 'c'}),
      new Record('2', {link: 'b'}),
      new Record('3', {link: 'a'}),
      new Record('4', {link: ['d', 'e']}),
      new Record('5', {link: null}),
    ]);
    const toStore = new Store([
      new Record('a', {}),
      new Record('b', {}),
      new Record('c', {}),
      new Record('d', {}),
      new Record('e', {}),
    ]);

    toStore.linkFromOne(fromStore, 'link', 'link');

    expect(toStore.get('a').link.key).toEqual('3');
    expect(toStore.get('b').link.key).toEqual('2');
    expect(toStore.get('c').link.key).toEqual('1');
    expect(toStore.get('d').link.key).toEqual('4');
    expect(toStore.get('e').link.key).toEqual('4');
  });

  it('Can create a reverse links', () => {
    const fromStore = new Store([
      new Record('1', {link: 'a'}),
    ]);
    const toStore = new Store([
      new Record('a', {}),
    ]);

    fromStore.linkToOne(toStore, 'link');
    toStore.linkFromOne(fromStore, 'link', 'link');

    expect(fromStore.get('1').link.key).toEqual('a');
    expect(toStore.get('a').link.key).toEqual('1');
  });

  it('Throws if a Record is mising', () => {
    const fromStore = new Store([
      new Record('1', {link: 'b'}),
    ]);
    const toStore = new Store([
      new Record('a', {}),
    ]);

    expect(() => {
      toStore.linkFromOne(fromStore, 'link', 'link');
    }).toThrow();

    expect(recordNotFoundSpy).toHaveBeenCalledWith('b', 'link', '1');
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
