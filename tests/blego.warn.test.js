import stripAnsi from 'strip-ansi';
import blego from '../core.js';

describe('blego.warn', () => {

  it('Writes to console', () => {
    blego.warn('message');

    expect(stripAnsi(console.log.mock.calls.pop().pop())).toEqual('message');
  });
});
