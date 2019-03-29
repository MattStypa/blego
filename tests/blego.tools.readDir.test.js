describe('blego.tools.readDir', () => {
  const nodePath = require('path');
  const tempDir = require('../tools/tempDir.js');
  const Blego = require('Blego.js');
  const errors = require('errors.js');
  const pathDoesNotExistSpy = jest.spyOn(errors, 'pathDoesNotExist');
  const notDirSpy = jest.spyOn(errors, 'notDir');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    pathDoesNotExistSpy.mockClear();
    notDirSpy.mockClear();
    blego = new Blego();
    tempDir({
      'fake/directory1/.hidden': '',
      'fake/directory1/file1': '',
      'fake/directory1/file2': '',
      'fake/directory2/file1': '',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Reads a directory', () => {
    expect(blego.tools.readDir('fake')).toEqual([
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory1/file2'),
      nodePath.resolve('fake/directory2/file1'),
    ]);
  });

  it('Reads a directory for glob matches', () => {
    expect(blego.tools.readDir('fake', '**/*1')).toEqual([
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory2/file1'),
    ]);
  });

  it('Reads a directory including subdirectories', () => {
    expect(blego.tools.readDir('fake', '**/*', true)).toEqual([
      nodePath.resolve('fake/directory1'),
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory1/file2'),
      nodePath.resolve('fake/directory2'),
      nodePath.resolve('fake/directory2/file1'),
    ]);
  });

  it('Reads a directory including dot files', () => {
    expect(blego.tools.readDir('fake/directory1', '**/*', true, true)).toEqual([
      nodePath.resolve('fake/directory1/.hidden'),
      nodePath.resolve('fake/directory1/file1'),
      nodePath.resolve('fake/directory1/file2'),
    ]);
  });

  it('Throws if path does not exist', () => {
    expect(() => {
      blego.tools.readDir('fake/file');
    }).toThrow();

    expect(pathDoesNotExistSpy).toHaveBeenCalledWith(nodePath.resolve('fake/file'));
  });

  it('Throws if path is not a directory', () => {
    expect(() => {
      blego.tools.readDir('fake/directory1/file1');
    }).toThrow();

    expect(notDirSpy).toHaveBeenCalledWith(nodePath.resolve('fake/directory1/file1'));
  });
});
