describe('blego.tasks.loadGlobals', () => {
  const mockFs = require('mock-fs');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
    new blego.Store([]);
    mockFs({
      'globals/config.json': '{"siteName": "test"}',
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('Loads globals', () => {
    blego.tasks.loadGlobals();

    expect(blego.global.config.siteName).toEqual('test');
  });
});
