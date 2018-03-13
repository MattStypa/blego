describe('blego.Store.where', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Gets Store with Records having prop equal to value', () => {
    const store = new blego.Store([
      new blego.Record('1', {value: 'a'}),
      new blego.Record('2', {value: 'b'}),
      new blego.Record('3', {value: 'a'}),
    ]);

    const filtered = store.where('value', 'a').all();

    expect(filtered[0].key).toEqual('1');
    expect(filtered[1].key).toEqual('3');
  });

  it('Gets Store with Records having prop array that contain value', () => {
    const store = new blego.Store([
      new blego.Record('1', {value: ['a', 'b']}),
      new blego.Record('2', {value: ['b', 'c']}),
      new blego.Record('3', {value: ['a', 'c']}),
    ]);

    const filtered = store.where('value', 'a').all();

    expect(filtered[0].key).toEqual('1');
    expect(filtered[1].key).toEqual('3');
  });
});
