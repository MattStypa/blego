describe('blego.tools.isDir', () => {
  const mockFs = require('mock-fs');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
    mockFs({
      '/fake/directory/file': '',
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('Checks if path is a directory', () => {
    expect(blego.tools.isDir('/fake/directory')).toBe(true);
  });

  it('Checks if path is not a directory', () => {
    expect(blego.tools.isDir('/fake/directory/file')).toBe(false);
    expect(blego.tools.isDir('/fake/file')).toBe(false);
  });
});
