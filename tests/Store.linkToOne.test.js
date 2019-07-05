describe('Store.linkToOne', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');
  const errors = require('lib/errors.js');
  
  const recordNotFoundSpy = jest.spyOn(errors, 'recordNotFound');

  it('Creates a link to one Record from a different Store', () => {
    const fromStore = new Store([
      new Record('1', {link: 'c'}),
      new Record('2', {link: 'b'}),
      new Record('3', {link: 'a'}),
      new Record('4', {link: null}),
    ]);
    const toStore = new Store([
      new Record('a', {}),
      new Record('b', {}),
      new Record('c', {}),
    ]);

    fromStore.linkToOne('link', toStore);

    expect(fromStore.get('1').link.key).toEqual('c');
    expect(fromStore.get('2').link.key).toEqual('b');
    expect(fromStore.get('3').link.key).toEqual('a');
    expect(fromStore.get('4').link).toEqual(undefined);
  });

  it('Throws if a Record is mising', () => {
    const fromStore = new Store([
      new Record('1', {link: 'b'}),
    ]);
    const toStore = new Store([
      new Record('a', {}),
    ]);

    expect(() => {
      fromStore.linkToOne('link', toStore);
    }).toThrow();

    expect(recordNotFoundSpy).toHaveBeenCalledWith('b', 'link', '1');
  });
});
