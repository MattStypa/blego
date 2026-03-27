import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import tempDir from '../test_utils/tempDir.js';
import parseDataDir from '../lib/tools/parseDataDir.js';

describe('tools.parseDataDir', () => {

  beforeEach(() => {
    tempDir('tools.parseDataDir', {
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
