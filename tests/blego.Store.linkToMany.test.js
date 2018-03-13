describe('blego.Store.linkToMany', () => {
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

    fromStore.linkToMany('links', toStore);

    expect(fromStore.get('1').links[0].key).toEqual('a');
    expect(fromStore.get('1').links[1].key).toEqual('b');
    expect(fromStore.get('2').links[0].key).toEqual('b');
    expect(fromStore.get('2').links[1].key).toEqual('c');
    expect(fromStore.get('3').links[0].key).toEqual('a');
    expect(fromStore.get('3').links[1].key).toEqual('c');
  });

  it('Throws if a Record is mising', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {links: ['b']}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
    ]);

    expect(() => {
      fromStore.linkToMany('links', toStore);
    }).toThrow();
  });
});
