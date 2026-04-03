import { describe, it, expect, vi } from 'vitest';
import Record from '../lib/Record.js';
import Store from '../lib/Store.js';

describe('Store.map', () => {
  it('Gets Store with modified records', () => {
    const fn = vi.fn((record) => {
      record.value = `key:${record.key}`;
      return record;
    });

    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
    ]);

    const mapped = store.map(fn);

    expect(mapped.get('1').value).toEqual('key:1');
    expect(mapped.get('2').value).toEqual('key:2');
  });

  it('Retains keys even if the mapping function modifies it', () => {
    const fn = vi.fn((record) => {
      record.key = '3';
      return record;
    });

    const store = new Store([
      new Record('1', {}),
    ]);

    const mapped = store.map(fn);

    expect(mapped.get('1').key).toEqual('1');
  });
});
