import { describe, it, expect } from 'vitest';
import blego from '../core';

describe('blego.dump', () => {
  it('Writes to console', () => {
    blego.dump('message');

    expect(console.log).toHaveBeenLastCalledWith('message');
  });
});
