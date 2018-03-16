describe('blego.tasks.loadPlugins', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Loads plugins', () => {
    const plugin = jest.fn();

    blego.options.plugins.push(plugin);
    blego.tasks.loadPlugins();

    expect(plugin).toHaveBeenCalledWith(blego);
  });
});
