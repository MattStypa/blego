describe('blego.Store.linkFromOne', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Creates a link to one Record from a different Store', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {link: 'c'}),
      new blego.Record('2', {link: 'b'}),
      new blego.Record('3', {link: 'a'}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
      new blego.Record('b', {}),
      new blego.Record('c', {}),
    ]);

    toStore.linkFromOne('link', fromStore, 'link');

    expect(toStore.get('a').link.key).toEqual('3');
    expect(toStore.get('b').link.key).toEqual('2');
    expect(toStore.get('c').link.key).toEqual('1');
  });

  it('Throws if a Record is mising', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {link: 'b'}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
    ]);

    expect(() => {
      toStore.linkFromOne('link', fromStore, 'link');
    }).toThrow();
  });
});
