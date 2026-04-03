import { describe, it, expect } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';

describe('Store.chunk', () => {
  it('Gets an array of Stores of specified size', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    const chunks = store.chunk(2);

    console.log(chunks);
    expect(chunks.length).toEqual(2);
    expect(chunks[0].count()).toEqual(2);
    expect(chunks[1].count()).toEqual(1);
  });
});
