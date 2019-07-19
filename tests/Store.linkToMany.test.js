describe('Store.linkToMany', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');
  const errors = require('lib/errors.js');

  const recordNotFoundSpy = jest.spyOn(errors, 'recordNotFound');

  it('Creates a links to many Records from a different Store', () => {
    const fromStore = new Store([
      new Record('1', {links: ['a', 'b']}),
      new Record('2', {links: ['b', 'c']}),
      new Record('3', {links: ['a', 'c']}),
      new Record('4', {links: null}),
    ]);
    const toStore = new Store([
      new Record('a', {}),
      new Record('b', {}),
      new Record('c', {}),
    ]);

    fromStore.linkToMany(toStore, 'links');

    expect(fromStore.get('1').links[0].key).toEqual('a');
    expect(fromStore.get('1').links[1].key).toEqual('b');
    expect(fromStore.get('2').links[0].key).toEqual('b');
    expect(fromStore.get('2').links[1].key).toEqual('c');
    expect(fromStore.get('3').links[0].key).toEqual('a');
    expect(fromStore.get('3').links[1].key).toEqual('c');
    expect(fromStore.get('4').links.length).toEqual(0);
  });

  it('Throws if a Record is mising', () => {
    const fromStore = new Store([
      new Record('1', {links: ['b']}),
    ]);
    const toStore = new Store([
      new Record('a', {}),
    ]);

    expect(() => {
      fromStore.linkToMany(toStore, 'links');
    }).toThrow();

    expect(recordNotFoundSpy).toHaveBeenCalledWith('b', 'links', '1');
  });
});
