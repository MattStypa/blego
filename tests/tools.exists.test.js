const nodePath = require('path');
const fs = require('fs-extra');
const tempDir = require('jest/tempDir.js');
const throwingMock = require('jest/throwingMock.js');

describe('tools.exists', () => {
  const errors = require('lib/errors.js');
  const exists = require('lib/tools/exists.js');

  const cantReadPathSpy = jest.spyOn(errors, 'cantReadPath');

  beforeEach(() => {
    tempDir({
      'fake/directory/file': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Checks if path exists', () => {
    expect(exists('fake/directory')).toEqual(true);
    expect(exists('fake/directory/file')).toEqual(true);
  });

  it('Checks if path does not exist', () => {
    expect(exists('fake/file')).toEqual(false);
  });

  it('Throws if path cannot be read', () => {
    const original = fs.existsSync;
    fs.existsSync = throwingMock;

    expect(() => {
      exists('fake/directory/file');
    }).toThrow();

    fs.existsSync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });
});
