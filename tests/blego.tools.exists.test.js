describe('blego.tools.exists', () => {
  const tempDir = require('../jest/tempDir.js');
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

  it('Checks if path exists', () => {
    expect(blego.tools.exists('fake/directory')).toBe(true);
    expect(blego.tools.exists('fake/directory/file')).toBe(true);
  });

  it('Checks if path does not exist', () => {
    expect(blego.tools.exists('fake/file')).toBe(false);
  });
});
