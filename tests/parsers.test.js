import { vi } from 'vitest';
import tempDir from '../test_utils/tempDir';
import parsers from '../lib/parsers';

vi.mock('../lib/tools/importSync.cjs', () => ({
  default: vi.fn(() => ({ name: 'c' })),
}));

describe('parsers', () => {

  beforeEach(() => {
    tempDir({
      'a.json': '{"name": "a"}',
      'b.yaml': 'name: b',
      'c.md': '# C',
      'd.html': '<h1>D</h1>',
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
    const data = parsers.md('c.md');

    expect(data.body).toEqual(expect.stringMatching(/<h1.*>C<\/h1>/));
  });

  it('parses html files', () => {
    const data = parsers.html('d.html');

    expect(data.body).toEqual(expect.stringMatching(/<h1>D<\/h1>/));
  });
});
