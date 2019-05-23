describe('blego.Store.pluck', () => {
  const blego = require('Blego.js');

  it('Gets all values in specified prop', () => {
    const store = new blego.Store([
      new blego.Record('1', {value: 'a'}),
      new blego.Record('2', {value: 'b'}),
      new blego.Record('3', {value: ['b', 'c']}),
      new blego.Record('4', {}),
    ]);

    expect(store.pluck('value')).toEqual(['a', 'b', 'b', 'c']);
  });
});
