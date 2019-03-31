describe('blego.Store.sort', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Gets Store sorted by function', () => {
    const store = new blego.Store([
      new blego.Record('1', {value: 100}),
      new blego.Record('2', {value: 20}),
      new blego.Record('3', {value: 3}),
    ]);

    const sorted = store.sort((a, b) => {
      return a.value - b.value;
    }).all();

    expect(sorted[0].key).toEqual('3');
    expect(sorted[1].key).toEqual('2');
    expect(sorted[2].key).toEqual('1');
  });
});
