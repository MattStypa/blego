const tempDir = require('jest/tempDir.js');

describe('parsers', () => {
  const parsers = require('lib/parsers.js');

  beforeEach(() => {
    tempDir({
      'a.json': '{"name": "a"}',
      'b.yaml': 'name: b',
      'c.js': `module.exports = {name: 'c'}`,
      'd.md': '# D',
      'e.html': '<h1>E</h1>',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('parses json files', () => {
    const data = parsers.json('a.json');

    expect(data.name).toEqual('a');
  });

  it('parses yaml files', () => {
    const data = parsers.yaml('b.yaml');

    expect(data.name).toEqual('b');
  });

  it('parses js files', () => {
    const data = parsers.js('c.js');

    expect(data.name).toEqual('c');
  });

  it('parses md files', () => {
    const data = parsers.md('d.md');

    expect(data.body).toEqual(expect.stringMatching(/<h1.*>D<\/h1>/));
  });

  it('parses html files', () => {
    const data = parsers.html('e.html');

    expect(data.body).toEqual(expect.stringMatching(/<h1>E<\/h1>/));
  });
});
