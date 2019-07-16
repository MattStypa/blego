describe('Blego', () => {
  const blego = require('core.js');

  it('Works', () => {
    expect(typeof blego).toEqual('object');
    expect(typeof blego.data).toEqual('object');
    expect(typeof blego.global).toEqual('object');
    expect(typeof blego.init).toEqual('function');
    expect(typeof blego.dd).toEqual('function');
    expect(typeof blego.dump).toEqual('function');
    expect(typeof blego.log).toEqual('function');
    expect(typeof blego.macro).toEqual('function');
    expect(typeof blego.page).toEqual('function');
    expect(typeof blego.warn).toEqual('function');
  });
});
