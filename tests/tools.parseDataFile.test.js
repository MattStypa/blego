import nodePath from 'path';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import errors from '../lib/errors';
import parsers from '../lib/parsers';
import parseDataFile from '../lib/tools/parseDataFile';
import tempDir from '../test_utils/tempDir';
import throwingMock from '../test_utils/throwingMock';

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
