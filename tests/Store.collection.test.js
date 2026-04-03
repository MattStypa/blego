import { Collection } from 'collect.js';
import { describe, it, expect } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';

describe('Store.collection', () => {
  it('Gets collection of Records', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    const collection = store.collection();

    expect(collection instanceof Collection).toBe(true);
  });
});
