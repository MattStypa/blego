const nodePath = require('path');
const tempDir = require('jest/tempDir.js');
const throwingMock = require('jest/throwingMock.js');

describe('tools.parseDataFile', () => {
  const errors = require('lib/errors.js');
  const parsers = require('lib/parsers.js');
  const parseDataFile = require('lib/tools/parseDataFile.js');

  const noTypeSpy = jest.spyOn(errors, 'noType');
  const noParserSpy = jest.spyOn(errors, 'noParser');
  const cantParseSpy = jest.spyOn(errors, 'cantParse');

  beforeEach(() => {
    tempDir({
      'a.json': '{"name": "a"}',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('parses data file', () => {
    const data = parseDataFile('a.json');

    expect(data.name).toEqual('a');
  });

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
