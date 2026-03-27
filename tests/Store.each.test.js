import { describe, it, expect, vi } from 'vitest';
import Record from '../lib/Record';
import Store from '../lib/Store';

describe('Store.each', () => {
  it('Calls a function on each record', () => {
    const fn = vi.fn();
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    store.each(fn);

    expect(fn.mock.calls[0][0].key).toEqual('1');
    expect(fn.mock.calls[1][0].key).toEqual('2');
    expect(fn.mock.calls[2][0].key).toEqual('3');
  });
});
