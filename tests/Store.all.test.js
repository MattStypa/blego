import { describe, it, expect } from 'vitest';
import Record from '../lib/Record';
import Store from '../lib/Store';

describe('Store.all', () => {
  it('Gets all records from the store', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    expect(store.all().length).toEqual(3);
  });
});
