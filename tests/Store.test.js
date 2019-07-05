describe('Store', () => {
  const Record = require('lib/Record.js');
  const Store = require('lib/Store.js');
  const errors = require('lib/errors.js');

  const invalidTypeInArraySpy = jest.spyOn(errors, 'invalidTypeInArray');
  const recordKeyDupeSpy = jest.spyOn(errors, 'recordKeyDupe');

  it('Creates a store from Records', () => {
    const store = new Store([
      new Record('1', {}),
      new Record('2', {}),
      new Record('3', {}),
    ]);

    expect(store.count()).toEqual(3);
  });

  it('Throws if object is not a Record', () => {
    expect(() => {
      new Store([
        {}
      ]);
    }).toThrow();

    expect(invalidTypeInArraySpy).toHaveBeenCalled();
  });

  it('Thorws if duplicate keys exists', () => {
    expect(() => {
      new Store([
        new Record('1', {}),
        new Record('1', {}),
      ]);
    }).toThrow();

    expect(recordKeyDupeSpy).toHaveBeenCalled();
  });
});
