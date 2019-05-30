const tempDir = require('jest/tempDir.js');

describe('tools.parseDataDir', () => {
  const parseDataDir = require('lib/tools/parseDataDir.js');

  beforeEach(() => {
    tempDir({
      'data/a.json': '{}',
      'data/b.json': '{}',
      'data/c/d.json': '{}',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('parses all data files', () => {
    const data = parseDataDir('data').map((item) => item.key);

    expect(data).toEqual(['a', 'b', 'c/d']);
  });
});
