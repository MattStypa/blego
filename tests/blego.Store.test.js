describe('blego.Store', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Creates a store from Records', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    expect(store.count()).toEqual(3);
  });

  it('Does not allow duplicate keys', () => {
    expect(() => {
      new blego.Store([
        new blego.Record('1', {}),
        new blego.Record('1', {}),
      ]);
    }).toThrow();
  });
});
