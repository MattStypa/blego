import { describe, it, expect } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';

describe('Store.where', () => {
  it('Gets Store with Records having prop equal to value', () => {
    const store = new Store([
      new Record('1', {value: 'a'}),
      new Record('2', {value: 'b'}),
      new Record('3', {value: 'a'}),
    ]);

    const filtered = store.where('value', 'a');

    expect(filtered.count()).toEqual(2);
    expect(filtered.get('1')).toBe(store.get('1'));
    expect(filtered.get('3')).toBe(store.get('3'));
  });

  it('Gets Store with Records having prop array that contains value', () => {
    const store = new Store([
      new Record('1', {value: ['a', 'b']}),
      new Record('2', {value: ['b', 'c']}),
      new Record('3', {value: ['a', 'c']}),
    ]);

    const filtered = store.where('value', 'a');

    expect(filtered.count()).toEqual(2);
    expect(filtered.get('1')).toBe(store.get('1'));
    expect(filtered.get('3')).toBe(store.get('3'));
  });
});
