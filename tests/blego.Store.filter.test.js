describe('blego.Store.filter', () => {
  const blego = require('Blego.js');

  it('Gets Store with Records filtered by function', () => {
    const store = new blego.Store([
      new blego.Record('1', {value: 'a'}),
      new blego.Record('2', {value: 'b'}),
      new blego.Record('3', {value: 'a'}),
    ]);

    const filtered = store.filter((record) => {
      return record.value === 'a';
    }).all();

    expect(filtered[0].key).toEqual('1');
    expect(filtered[1].key).toEqual('3');
  });
});
