describe('blego.tools.isFile', () => {
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

  it('Checks if path is a file', () => {
    expect(blego.tools.isFile('/fake/directory/file')).toBe(true);
  });

  it('Checks if path is not a file', () => {
    expect(blego.tools.isFile('/fake/directory')).toBe(false);
    expect(blego.tools.isFile('/fake/file')).toBe(false);
  });
});
