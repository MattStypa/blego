describe('blego.tools.jailPath', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Normalizes path to current directory', () => {
    expect(blego.tools.jailPath('a/b/../../c/d/e/..')).toBe('c/d');
  });

  it('Prevents the path from escaping the current directory', () => {
    expect(blego.tools.jailPath('/../../a')).toBe('a');
  });
});
