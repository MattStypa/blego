import { vi } from 'vitest';
import nodePath from 'path';
import tempDir from '../jest_utils/tempDir.js';
import throwingMock from '../jest_utils/throwingMock.js';
import errors from '../lib/errors.js';
import parsers from '../lib/parsers.js';
import parseDataFile from '../lib/tools/parseDataFile.js';

describe('tools.parseDataFile', () => {

  const noTypeSpy = vi.spyOn(errors, 'noType');
  const noParserSpy = vi.spyOn(errors, 'noParser');
  const cantParseSpy = vi.spyOn(errors, 'cantParse');

  beforeEach(() => {
    tempDir({
      'a.json': '{"name": "a"}',
      'b.YAML': 'name: b',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('parses data file', () => {
    const data = parseDataFile('a.json');

    expect(data.name).toEqual('a');
  });

  it('accepts uppercase data file extensions', () => {
    parseDataFile('b.YAML');
  })

  it('Throws if data file has no type', () => {
    tempDir({
      'a': '',
    });

    expect(() => {
      parseDataFile('a');
    }).toThrow();

    expect(noTypeSpy).toHaveBeenCalledWith(nodePath.resolve('a'));
  });

  it('Throws if data file has unknown type', () => {
    tempDir({
      'a.data': '',
    });

    expect(() => {
      parseDataFile('a.data');
    }).toThrow();

    expect(noParserSpy).toHaveBeenCalledWith(nodePath.resolve('a.data'));
  });

  it('Throws if parsing fails', () => {
    parsers.json = throwingMock

    expect(() => {
      parseDataFile('a.json');
    }).toThrow();

    expect(cantParseSpy).toHaveBeenCalledWith(nodePath.resolve('a.json'));
  });
});
