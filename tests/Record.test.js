describe('Record', () => {
  const Record = require('lib/Record.js');
  const errors = require('lib/errors.js');
  
  const keyRequiredSpy = jest.spyOn(errors, 'keyRequired');

  it('Creates a Record with key and props', () => {
    const record = new Record('key', {
      name: 'Blego',
    });

    expect(record).toEqual({
      key: 'key',
      name: 'Blego',
    });
  });

  it('Creates a Record without props', () => {
    const record = new Record('key');

    expect(record).toEqual({key: 'key'});
  });

  it('Throws if key is empty', () => {
    expect(() => {
      new Record('', {});
    }).toThrow();

    expect(keyRequiredSpy).toHaveBeenCalled();
  });
});
