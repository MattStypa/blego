describe('blego.Store.linkFromOne', () => {
  const blego = require('Blego.js');
  const recordNotFoundSpy = jest.spyOn(blego.tools.errors, 'recordNotFound');
  const invalidTypeInArraySpy = jest.spyOn(blego.tools.errors, 'invalidTypeInArray');
  const recordLinkedSpy = jest.spyOn(blego.tools.errors, 'recordLinked');

  it('Creates a link to one Record from a different Store', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {link: 'c'}),
      new blego.Record('2', {link: 'b'}),
      new blego.Record('3', {link: 'a'}),
      new blego.Record('4', {link: ['d', 'e']}),
      new blego.Record('5', {link: null}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
      new blego.Record('b', {}),
      new blego.Record('c', {}),
      new blego.Record('d', {}),
      new blego.Record('e', {}),
    ]);

    toStore.linkFromOne('link', fromStore, 'link');

    expect(toStore.get('a').link.key).toEqual('3');
    expect(toStore.get('b').link.key).toEqual('2');
    expect(toStore.get('c').link.key).toEqual('1');
    expect(toStore.get('d').link.key).toEqual('4');
    expect(toStore.get('e').link.key).toEqual('4');
  });

  it('Can create a reverse links', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {link: 'a'}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
    ]);

    fromStore.linkToOne('link', toStore);
    toStore.linkFromOne('link', fromStore, 'link');

    expect(fromStore.get('1').link.key).toEqual('a');
    expect(toStore.get('a').link.key).toEqual('1');
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

    expect(recordNotFoundSpy).toHaveBeenCalledWith('b', 'link', '1');
  });

  it('Throws if a related Record key is not a string', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {link: [1]}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
    ]);

    expect(() => {
      toStore.linkFromOne('link', fromStore, 'link');
    }).toThrow();

    expect(invalidTypeInArraySpy).toHaveBeenCalledWith('link', 'string', '1');
  });

  it('Throws if the Record is already linked', () => {
    const fromStore = new blego.Store([
      new blego.Record('1', {link: 'a'}),
      new blego.Record('2', {link: 'a'}),
    ]);
    const toStore = new blego.Store([
      new blego.Record('a', {}),
    ]);

    expect(() => {
      toStore.linkFromOne('link', fromStore, 'link');
    }).toThrow();

    expect(recordLinkedSpy).toHaveBeenCalledWith('a', 'link', '2', '1');
  });
});
