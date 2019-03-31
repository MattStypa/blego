describe('blego.tools.exists', () => {
  const nodePath = require('path');
  const fs = require('fs-extra');
  const tempDir = require('../jest/tempDir.js');
  const throwingMock = require('../jest/throwingMock.js');
  const Blego = require('Blego.js');
  const errors = require('errors.js');
  const cantReadPathSpy = jest.spyOn(errors, 'cantReadPath');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
    tempDir({
      'fake/directory/file': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Checks if path exists', () => {
    expect(blego.tools.exists('fake/directory')).toBe(true);
    expect(blego.tools.exists('fake/directory/file')).toBe(true);
  });

  it('Checks if path does not exist', () => {
    expect(blego.tools.exists('fake/file')).toBe(false);
  });

  it('Throws if path cannot be read', () => {
    const original = fs.existsSync;
    fs.existsSync = throwingMock;

    expect(() => {
      blego.tools.exists('fake/directory/file');
    }).toThrow();

    fs.existsSync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });
});
