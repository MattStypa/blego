describe('blego.tools.exists', () => {
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

  it('Checks if path exists', () => {
    expect(blego.tools.exists('/fake/directory')).toBe(true);
    expect(blego.tools.exists('/fake/directory/file')).toBe(true);
  });

  it('Checks if path does not exist', () => {
    expect(blego.tools.exists('/fake/file')).toBe(false);
  });
});
