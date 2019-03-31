describe('blego.tools.readFile', () => {
  const nodePath = require('path');
  const fs = require('fs-extra');
  const tempDir = require('../jest/tempDir.js');
  const throwingMock = require('../jest/throwingMock.js');
  const Blego = require('Blego.js');
  const errors = require('errors.js');
  const pathDoesNotExistSpy = jest.spyOn(errors, 'pathDoesNotExist');
  const notFileSpy = jest.spyOn(errors, 'notFile');
  const cantReadPathSpy = jest.spyOn(errors, 'cantReadPath');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    pathDoesNotExistSpy.mockClear();
    notFileSpy.mockClear();
    blego = new Blego();
    tempDir({
      'fake/directory/file': 'file content',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Reads a file', () => {
    expect(blego.tools.readFile('fake/directory/file')).toBe('file content');
  });

  it('Throws if path does not exist', () => {
    expect(() => {
      blego.tools.readFile('fake/file');
    }).toThrow();

    expect(pathDoesNotExistSpy).toHaveBeenCalledWith(nodePath.resolve('fake/file'));
  });

  it('Throws if path is not a file', () => {
    expect(() => {
      blego.tools.readFile('fake/directory');
    }).toThrow();

    expect(notFileSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory'));
  });

  it('Throws if path cannot be read', () => {
    const original = fs.readFileSync;
    fs.readFileSync = throwingMock;

    expect(() => {
      blego.tools.readFile('fake/directory/file');
    }).toThrow();

    fs.readFileSync = original;

    expect(cantReadPathSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory/file'));
  });
});
