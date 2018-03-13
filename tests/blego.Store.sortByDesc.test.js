describe('blego.Store.sortByDesc', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Gets Store sorted by prop in descending order', () => {
    const store = new blego.Store([
      new blego.Record('1', {value: '3'}),
      new blego.Record('2', {value: '20'}),
      new blego.Record('3', {value: '100'}),
    ]);

    const sorted = store.sortByDesc('value').all();

    expect(sorted[0].key).toEqual('3');
    expect(sorted[1].key).toEqual('2');
    expect(sorted[2].key).toEqual('1');
  });
});
