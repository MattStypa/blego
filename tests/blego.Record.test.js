describe('blego.Record', () => {
  const Blego = require('Blego.js');
  const errors = require('errors.js');
  const keyRequiredSpy = jest.spyOn(errors, 'keyRequired');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

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
