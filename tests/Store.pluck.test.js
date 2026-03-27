import { describe, it, expect } from 'vitest';
import Record from '../lib/Record';
import Store from '../lib/Store';

describe('Store.pluck', () => {
  it('Gets all values in specified prop', () => {
    const store = new Store([
      new Record('1', {value: 'a'}),
      new Record('2', {value: 'b'}),
      new Record('3', {value: ['b', 'c']}),
      new Record('4', {}),
    ]);

    expect(store.pluck('value')).toEqual(['a', 'b', 'b', 'c']);
  });
});
