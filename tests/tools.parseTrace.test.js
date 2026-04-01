import { describe, it, expect } from 'vitest';
import parseTrace from '../lib/tools/parseTrace.js';

describe('tools.parseTrace', () => {
  it('Parses a trace', () => {
    const trace = parseTrace(new Error());

    expect(trace[0].file).toEqual('tests/tools.parseTrace.test.js');
    expect(trace[0].line).toEqual(6);
    expect(trace[0].function).toEqual('anonymous');
  });
});
