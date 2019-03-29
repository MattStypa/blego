describe('blego.tasks.loadGlobals', () => {
  const tempDir = require('../jest/tempDir.js');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
    new blego.Store([]);
    tempDir({
      'globals/config.json': '{"siteName": "test"}',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Loads globals', () => {
    blego.tasks.loadGlobals();

    expect(blego.global.config.siteName).toEqual('test');
  });
});
