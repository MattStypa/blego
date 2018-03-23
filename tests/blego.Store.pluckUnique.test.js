describe('blego.Store.pluckUnique', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Gets all unique values in specified prop', () => {
    const store = new blego.Store([
      new blego.Record('1', {value: 'a'}),
      new blego.Record('2', {value: 'b'}),
      new blego.Record('3', {value: ['b', 'c']}),
      new blego.Record('4', {}),
    ]);

    expect(store.pluckUnique('value')).toEqual(['a', 'b', 'c']);
  });
});
