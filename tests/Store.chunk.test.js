import { describe, it, expect } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';

describe('Store.chunk', () => {
  it('Gets an array of arrays of specified length', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    const chunks = store.chunk(2);

    expect(chunks.length).toEqual(2);
    expect(chunks[0].length).toEqual(2);
    expect(chunks[1].length).toEqual(1);
  });
});
