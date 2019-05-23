describe('blego.tools.isFile', () => {
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

  it('Checks if path is a file', () => {
    expect(blego.tools.isFile('fake/directory/file')).toBe(true);
  });

  it('Checks if path is not a file', () => {
    expect(blego.tools.isFile('fake/directory')).toBe(false);
    expect(blego.tools.isFile('fake/file')).toBe(false);
  });

  it('Throws if path cannot be read', () => {
    const original = fs.statSync;
    fs.statSync = throwingMock;

    expect(() => {
      blego.tools.isFile('fake/directory/file');
    }).toThrow();

    fs.statSync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });

});
