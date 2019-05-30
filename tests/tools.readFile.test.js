const nodePath = require('path');
const fs = require('fs-extra');
const tempDir = require('jest/tempDir.js');
const throwingMock = require('jest/throwingMock.js');

describe('tools.readFile', () => {
  const errors = require('lib/errors.js');
  const readFile = require('lib/tools/readFile.js');

  const pathDoesNotExistSpy = jest.spyOn(errors, 'pathDoesNotExist');
  const notFileSpy = jest.spyOn(errors, 'notFile');
  const cantReadPathSpy = jest.spyOn(errors, 'cantReadPath');

  beforeEach(() => {
    tempDir({
      'fake/directory/file': 'file content',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Reads a file', () => {
    expect(readFile('fake/directory/file')).toEqual('file content');
  });

  it('Throws if path does not exist', () => {
    expect(() => {
      readFile('fake/file');
    }).toThrow();

    expect(pathDoesNotExistSpy).toHaveBeenCalledWith(nodePath.resolve('fake/file'));
  });

  it('Throws if path is not a file', () => {
    expect(() => {
      readFile('fake/directory');
    }).toThrow();

    expect(notFileSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory'));
  });

  it('Throws if path cannot be read', () => {
    const original = fs.readFileSync;
    fs.readFileSync = throwingMock;

    expect(() => {
      readFile('fake/directory/file');
    }).toThrow();

    fs.readFileSync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });
});
