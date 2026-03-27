import { describe, it, expect } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';

describe('Store.reverse', () => {

  it('Reverts the order of Records', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    const reversed = store.reverse().all();

    expect(reversed[0].key).toEqual('3');
    expect(reversed[1].key).toEqual('2');
    expect(reversed[2].key).toEqual('1');
  });
});
