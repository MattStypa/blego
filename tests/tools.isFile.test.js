const nodePath = require('path');
const fs = require('fs-extra');
const tempDir = require('jest_utils/tempDir.js');
const throwingMock = require('jest_utils/throwingMock.js');

describe('tools.isFile', () => {
  const errors = require('lib/errors.js');
  const isFile = require('lib/tools/isFile.js');

  const cantReadPathSpy = jest.spyOn(errors, 'cantReadPath');

  beforeEach(() => {
    tempDir({
      'fake/directory/file': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Checks if path is a file', () => {
    expect(isFile('fake/directory/file')).toEqual(true);
  });

  it('Checks if path is not a file', () => {
    expect(isFile('fake/directory')).toEqual(false);
    expect(isFile('fake/file')).toEqual(false);
  });

  it('Throws if path cannot be read', () => {
    const original = fs.statSync;
    fs.statSync = throwingMock;

    expect(() => {
      isFile('fake/directory/file');
    }).toThrow();

    fs.statSync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });

});
