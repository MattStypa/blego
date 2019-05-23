describe('blego.Store', () => {
  const blego = require('Blego.js');
  const invalidRecordTypeSpy = jest.spyOn(blego.tools.errors, 'invalidRecordType');
  const recordKeyDupeSpy = jest.spyOn(blego.tools.errors, 'recordKeyDupe');

  it('Creates a store from Records', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    expect(store.count()).toEqual(3);
  });

  it('Throws if object is not a Record', () => {
    expect(() => {
      new blego.Store([
        {}
      ]);
    }).toThrow();

    expect(invalidRecordTypeSpy).toHaveBeenCalled();
  });

  it('Thorws if duplicate keys exists', () => {
    expect(() => {
      new blego.Store([
        new blego.Record('1', {}),
        new blego.Record('1', {}),
      ]);
    }).toThrow();

    expect(recordKeyDupeSpy).toHaveBeenCalled();
  });
});
