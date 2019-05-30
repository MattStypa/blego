const nodePath = require('path');
const fs = require('fs-extra');
const tempDir = require('jest/tempDir.js');
const throwingMock = require('jest/throwingMock.js');

describe('tools.isDir', () => {
  const errors = require('lib/errors.js');
  const isDir = require('lib/tools/isDir.js');

  const cantReadPathSpy = jest.spyOn(errors, 'cantReadPath');

  beforeEach(() => {
    tempDir({
      'fake/directory/file': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Checks if path is a directory', () => {
    expect(isDir('fake/directory')).toEqual(true);
  });

  it('Checks if path is not a directory', () => {
    expect(isDir('fake/directory/file')).toEqual(false);
    expect(isDir('fake/file')).toEqual(false);
  });

  it('Throws if path cannot be read', () => {
    const original = fs.statSync;
    fs.statSync = throwingMock;

    expect(() => {
      isDir('fake/directory/file');
    }).toThrow();

    fs.statSync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });
});
