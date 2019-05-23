describe('blego.Store.linkFromMany', () => {
  const blego = require('Blego.js');
  const recordNotFoundSpy = jest.spyOn(blego.tools.errors, 'recordNotFound');
  const invalidTypeInArraySpy = jest.spyOn(blego.tools.errors, 'invalidTypeInArray');

  it('Creates a links to many Records from a different Store', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {links: ['a', 'b']}),
      new blego.Record('2', {links: ['b', 'c']}),
      new blego.Record('3', {links: 'a'}),
      new blego.Record('4', {links: null}),
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
  });

  it('Can create a reverse links', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {links: ['a', 'b']}),
      new blego.Record('2', {links: ['a', 'b']}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
      new blego.Record('b', {}),
    ]);

    fromStore.linkToMany('links', toStore);
    toStore.linkFromMany('links', fromStore, 'links');

    expect(fromStore.get('1').links[0].key).toEqual('a');
    expect(fromStore.get('1').links[1].key).toEqual('b');
    expect(fromStore.get('2').links[0].key).toEqual('a');
    expect(fromStore.get('2').links[1].key).toEqual('b');
    expect(toStore.get('a').links[0].key).toEqual('1');
    expect(toStore.get('a').links[1].key).toEqual('2');
    expect(toStore.get('b').links[0].key).toEqual('1');
    expect(toStore.get('b').links[1].key).toEqual('2');
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

    expect(recordNotFoundSpy).toHaveBeenCalledWith('b', 'links', '1');
  });

  it('Throws if a related Record key is not a string', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {links: [1]}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
    ]);

    expect(() => {
      toStore.linkFromMany('links', fromStore, 'links');
    }).toThrow();

    expect(invalidTypeInArraySpy).toHaveBeenCalledWith('links', 'string', '1');
  });
});
