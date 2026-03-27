import { describe, it, expect } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';

describe('Store.iterator', () => {

  it('Can iterate over the Store', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    const keys = [...store].map((record) => record.key);

    expect(keys).toEqual(['1', '2', '3']);
  });
});
