describe('blego.Store.linkToOne', () => {
  const Blego = require('Blego.js');
  const errors = require('errors.js');
  const recordNotFoundSpy = jest.spyOn(errors, 'recordNotFound');
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
      new blego.Record('4', {link: null}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
      new blego.Record('b', {}),
      new blego.Record('c', {}),
    ]);

    fromStore.linkToOne('link', toStore);

    expect(fromStore.get('1').link.key).toEqual('c');
    expect(fromStore.get('2').link.key).toEqual('b');
    expect(fromStore.get('3').link.key).toEqual('a');
    expect(fromStore.get('4').link).toEqual(undefined);
  });

  it('Throws if a Record is mising', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {link: 'b'}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
    ]);

    expect(() => {
      fromStore.linkToOne('link', toStore);
    }).toThrow();

    expect(recordNotFoundSpy).toHaveBeenCalledWith('b', 'link', '1');
  });
});
