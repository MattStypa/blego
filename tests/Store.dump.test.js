import { describe, it, expect } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';

describe('Store.dump', () => {
  it('Writes the Records to console', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    store.dump();

    expect(console.log.mock.calls.pop().pop().items.length).toEqual(3);
  });
});
