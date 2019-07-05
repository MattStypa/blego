describe('tools.parseTrace', () => {
  const parseTrace = require('lib/tools/parseTrace.js');

  it('Parses a trace', () => {
    const trace = parseTrace(new Error());

    expect(trace[0].file).toEqual('tests/tools.parseTrace.test.js');
    expect(trace[0].line).toEqual(5);
    expect(trace[0].function).toEqual('it');
  });
});
