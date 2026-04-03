import { describe, it, expect } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';

describe('Store.filter', () => {
  it('Gets Store with Records filtered by function', () => {
    const store = new Store([
      new Record('1', {value: 'a'}),
      new Record('2', {value: 'b'}),
      new Record('3', {value: 'a'}),
    ]);

    const newStore = store.filter((record) => {
      return record.value === 'a';
    });

    expect(newStore.count()).toEqual(2);
    expect(newStore.get('1')).toBe(store.get('1'));
    expect(newStore.get('3')).toBe(store.get('3'));
  });
});
