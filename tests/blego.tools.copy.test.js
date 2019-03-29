describe('blego.tools.copy', () => {
  const nodePath = require('path');
  const fs = require('fs-extra');
  const tempDir = require('../jest/tempDir.js');
  const Blego = require('Blego.js');
  const errors = require('errors.js');
  const pathDoesNotExistSpy = jest.spyOn(errors, 'pathDoesNotExist');
  const pathExistsSpy = jest.spyOn(errors, 'pathExists');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    pathDoesNotExistSpy.mockClear();
    pathExistsSpy.mockClear();
    blego = new Blego();
    tempDir({
      'fake/directory1/file1': 'file content',
      'fake/directory1/file2': '',
      'fake/directory1/directory2': null,
      'fake/directory3/file3': '',
      'fake/directory4/file1': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Copies a file', () => {
    blego.tools.copy('fake/directory1/file1', 'fake/directory1/file3');
    blego.tools.copy('fake/directory1/file1', 'fake/directory3/file1');

    expect(fs.readdirSync('fake/directory1')).toEqual(['directory2', 'file1', 'file2', 'file3']);
    expect(fs.readdirSync('fake/directory3')).toEqual(['file1', 'file3']);
    expect(fs.readFileSync('fake/directory1/file3').toString()).toEqual(fs.readFileSync('fake/directory1/file1').toString());
    expect(fs.readFileSync('fake/directory3/file1').toString()).toEqual(fs.readFileSync('fake/directory1/file1').toString());
  });

  it('Copies a file to a directory', () => {
    blego.tools.copy('fake/directory1/file1', 'fake/directory3');

    expect(fs.readdirSync('fake/directory3')).toEqual(['file1', 'file3']);
    expect(fs.readFileSync('fake/directory3/file1').toString()).toEqual(fs.readFileSync('fake/directory1/file1').toString())
  });

  it('Copies a directory', () => {
    blego.tools.copy('fake/directory1', 'fake/directory5');

    expect(fs.readdirSync('fake/directory5')).toEqual(['directory2', 'file1', 'file2']);
  });

  it('Copies a directory to a directory', () => {
    blego.tools.copy('fake/directory1', 'fake/directory3');

    expect(fs.readdirSync('fake/directory3')).toEqual(['directory2', 'file1', 'file2', 'file3']);
  });

  it('Throws if source does not exist', () => {
    expect(() => {
      blego.tools.copy('fake/directory1/file0', 'fake/directory1/copy0');
    }).toThrow();

    expect(pathDoesNotExistSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory1/file0'));
  });

  it('Throws if destination file already exists', () => {
    expect(() => {
      blego.tools.copy('fake/directory1/file1', 'fake/directory1/file2');
    }).toThrow();

    expect(pathExistsSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory1/file2'));
  });

  it('Throws if destination directory already contains a source file', () => {
    expect(() => {
      blego.tools.copy('fake/directory1/file1', 'fake/directory4');
    }).toThrow();

    expect(pathExistsSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory4/file1'));
  });

  it('Throws if destination directory already contains a file from the source directory', () => {
    expect(() => {
      blego.tools.copy('fake/directory1', 'fake/directory4');
    }).toThrow();

    expect(pathExistsSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory4/file1'));
  });
});
