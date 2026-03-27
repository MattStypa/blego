import stripAnsi from 'strip-ansi';
import { describe, it, expect } from 'vitest';
import blego from '../core';

describe('blego.log', () => {
  it('Writes to console', () => {
    blego.log('message');

    expect(stripAnsi(console.log.mock.calls.pop().pop())).toEqual('message');
  });
});
