describe('blego.tools.isFile', () => {
  const tempDir = require('../tools/tempDir.js');
  const Blego = require('Blego.js');
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

  it('Checks if path is a file', () => {
    expect(blego.tools.isFile('fake/directory/file')).toBe(true);
  });

  it('Checks if path is not a file', () => {
    expect(blego.tools.isFile('fake/directory')).toBe(false);
    expect(blego.tools.isFile('fake/file')).toBe(false);
  });
});
