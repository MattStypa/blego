import { describe, it, expect } from 'vitest';
import Record from '../lib/Record';
import Store from '../lib/Store';

describe('Store.isEmpty', () => {
  it('Checks if Store is empty', () => {
    const emptyStore = new Store([ ]);
    const store = new Store([
      new Record('1', {}),
    ]);

    expect(emptyStore.isEmpty()).toEqual(true);
    expect(store.isEmpty()).toEqual(false);
  });
});
