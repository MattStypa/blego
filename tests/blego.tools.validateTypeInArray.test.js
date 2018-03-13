describe('blego.tools.validateTypeInArray', () => {
  const Blego = require('Blego.js');
  const errors = require('errors.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    errors.invalidTypeInArray = jest.fn();
    blego = new Blego();
  });

  it('Validates types', () => {
    blego.tools.validateTypeInArray(null, 'string', ['abc', 'def']);
    blego.tools.validateTypeInArray(null, 'object', [{}, []]);
  });

  it('Validates against array of types', () => {
    blego.tools.validateTypeInArray(null, ['null', 'string', 'number'], [null, 'abc', 123]);
  });

  it('Throws if the type is invalid', () => {
    blego.tools.validateTypeInArray('argument', 'number', ['abc']);
    expect(errors.invalidTypeInArray).toHaveBeenCalledWith('argument', 'number', 'string');
  });

  it('Throws if the type is not in the array of types', () => {
    blego.tools.validateTypeInArray('argument', ['null', Array], [{}]);
    expect(errors.invalidTypeInArray).toHaveBeenCalledWith('argument', 'null or array', 'object');
  });
});
