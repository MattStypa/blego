import { vi } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';

describe('Store.map', () => {

  it('Gets mapped array of the records', () => {
    const fn = vi.fn((record) => 'key:' + record.key);
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    const mapped = store.map(fn);

    expect(mapped[0]).toEqual('key:1');
    expect(mapped[1]).toEqual('key:2');
    expect(mapped[2]).toEqual('key:3');
  });
});
