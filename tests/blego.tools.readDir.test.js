describe('blego.tools.readDir', () => {
  const mockFs = require('mock-fs');
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
    mockFs({
      '/fake/directory1/.hidden': '',
      '/fake/directory1/file1': '',
      '/fake/directory1/file2': '',
      '/fake/directory2/file1': '',
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('Reads a directory', () => {
    expect(blego.tools.readDir('/fake')).toEqual([
      '/fake/directory1/file1',
      '/fake/directory1/file2',
      '/fake/directory2/file1',
    ]);
  });

  it('Reads a directory for glob matches', () => {
    expect(blego.tools.readDir('/fake', '**/*1')).toEqual([
      '/fake/directory1/file1',
      '/fake/directory2/file1',
    ]);
  });

  it('Reads a directory including subdirectories', () => {
    expect(blego.tools.readDir('/fake', '**/*', true)).toEqual([
      '/fake/directory1',
      '/fake/directory1/file1',
      '/fake/directory1/file2',
      '/fake/directory2',
      '/fake/directory2/file1',
    ]);
  });

  it('Reads a directory including dot files', () => {
    expect(blego.tools.readDir('/fake/directory1', '**/*', true, true)).toEqual([
      '/fake/directory1/.hidden',
      '/fake/directory1/file1',
      '/fake/directory1/file2',
    ]);
  });

  it('Throws if path does not exist', () => {
    expect(() => {
      blego.tools.readDir('/fake/file');
    }).toThrow();

    expect(pathDoesNotExistSpy).toHaveBeenCalledWith('/fake/file');
  });

  it('Throws if path is not a directory', () => {
    expect(() => {
      blego.tools.readDir('/fake/directory1/file1');
    }).toThrow();

    expect(notDirSpy).toHaveBeenCalledWith('/fake/directory1/file1');
  });
});
