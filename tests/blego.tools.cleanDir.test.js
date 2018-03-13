describe('blego.tools.cleanDir', () => {
  const fs = require('fs-extra');
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
      '/fake/directory/file': '',
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('Cleans a directory', () => {
    blego.tools.cleanDir('/fake/directory');

    expect(fs.readdirSync('/fake/directory')).toEqual([]);
  });

  it('Throws if path does not exist', () => {
    expect(() => {
      blego.tools.cleanDir('/fake/file');
    }).toThrow();

    expect(pathDoesNotExistSpy).toHaveBeenCalledWith('/fake/file');
  });

  it('Throws if path is not a directory', () => {
    expect(() => {
      blego.tools.readDir('/fake/directory/file');
    }).toThrow();

    expect(notDirSpy).toHaveBeenCalledWith('/fake/directory/file');
  });
});
