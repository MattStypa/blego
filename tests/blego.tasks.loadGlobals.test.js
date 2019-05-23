describe('blego.tasks.loadGlobals', () => {
  const tempDir = require('../jest/tempDir.js');
  const blego = require('Blego.js');

  beforeEach(() => {
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
