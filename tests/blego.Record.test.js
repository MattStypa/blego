describe('blego.Record', () => {
  const blego = require('Blego.js');
  const keyRequiredSpy = jest.spyOn(blego.tools.errors, 'keyRequired');

  it('Creates a Record with key and props', () => {
    const record = new blego.Record('key', {
      name: 'Blego',
    });

    expect(record).toEqual({
      key: 'key',
      name: 'Blego',
    });
  });

  it('Creates a Record without props', () => {
    const record = new blego.Record('key');

    expect(record).toEqual({key: 'key'});
  });

  it('Throws if key is empty', () => {
    expect(() => {
      new blego.Record('', {});
    }).toThrow();

    expect(keyRequiredSpy).toHaveBeenCalled();
  });
});
