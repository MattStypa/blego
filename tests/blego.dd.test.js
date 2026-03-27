import { describe, it, expect, beforeEach, vi } from 'vitest';
import blego from '../core.js';

describe('blego.dd', () => {
  beforeEach(() => {
    process.exit = vi.fn();
  });

  it('Writes to console', () => {
    blego.dd('message');

    expect(console.log).toHaveBeenLastCalledWith('message');
  });

  it('Stops the process', () => {
    blego.dd('message');

    expect(process.exit).toHaveBeenCalledWith(1);
  })
});
