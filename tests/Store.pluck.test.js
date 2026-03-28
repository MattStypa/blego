import { describe, it, expect } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';

describe('Store.pluck', () => {
  it('Gets all values in the specified prop', () => {
    const store = new Store([
      new Record('1', {value: 'a'}),
      new Record('2', {value: 'b'}),
      new Record('3', {value: ['b', 'c']}),
      new Record('4', {}),
    ]);

    expect(store.pluck('value')).toEqual(['a', 'b', 'b', 'c']);
  });
});
