import { describe, it, expect, beforeEach, vi } from 'vitest';
import Record from '../lib/Record';
import Store from '../lib/Store';

describe('Store.dd', () => {
  beforeEach(() => {
    process.exit = vi.fn();
  });

  it('Writes the Records to console', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    store.dd();

    expect(console.log.mock.calls.pop().pop().items.length).toEqual(3);
  });

  it('Stops the process', () => {
    const store = new Store([]);

    store.dd();

    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
