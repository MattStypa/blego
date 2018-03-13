describe('blego.Store.linkFromMany', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Creates a links to many Records from a different Store', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {links: ['a', 'b']}),
      new blego.Record('2', {links: ['b', 'c']}),
      new blego.Record('3', {links: ['a', 'c']}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
      new blego.Record('b', {}),
      new blego.Record('c', {}),
    ]);

    toStore.linkFromMany('links', fromStore, 'links');

    expect(toStore.get('a').links[0].key).toEqual('1');
    expect(toStore.get('a').links[1].key).toEqual('3');
    expect(toStore.get('b').links[0].key).toEqual('1');
    expect(toStore.get('b').links[1].key).toEqual('2');
    expect(toStore.get('c').links[0].key).toEqual('2');
    expect(toStore.get('c').links[1].key).toEqual('3');
  });

  it('Throws if a Record is mising', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {links: ['b']}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
    ]);

    expect(() => {
      toStore.linkFromMany('links', fromStore, 'links');
    }).toThrow();
  });
});
