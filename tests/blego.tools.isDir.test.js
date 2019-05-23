describe('blego.tools.isDir', () => {
  const nodePath = require('path');
  const fs = require('fs-extra');
  const tempDir = require('../jest/tempDir.js');
  const throwingMock = require('../jest/throwingMock.js');
  const blego = require('Blego.js');
  const cantReadPathSpy = jest.spyOn(blego.tools.errors, 'cantReadPath');

  beforeEach(() => {
    tempDir({
      'fake/directory/file': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Checks if path is a directory', () => {
    expect(blego.tools.isDir('fake/directory')).toBe(true);
  });

  it('Checks if path is not a directory', () => {
    expect(blego.tools.isDir('fake/directory/file')).toBe(false);
    expect(blego.tools.isDir('fake/file')).toBe(false);
  });

  it('Throws if path cannot be read', () => {
    const original = fs.statSync;
    fs.statSync = throwingMock;

    expect(() => {
      blego.tools.isDir('fake/directory/file');
    }).toThrow();

    fs.statSync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });
});
