describe('blego.tools.validateTypeInArray', () => {
  const blego = require('Blego.js');
  const invalidTypeInArraySpy = jest.spyOn(blego.tools.errors, 'invalidTypeInArray');

  beforeEach(() => {
    invalidTypeInArraySpy.mockClear();
  });

  it('Validates types', () => {
    blego.tools.validateTypeInArray(null, 'string', ['abc', 'def']);
    blego.tools.validateTypeInArray(null, 'object', [{}, []]);
  });

  it('Validates against array of types', () => {
    blego.tools.validateTypeInArray(null, ['null', 'string', 'number'], [null, 'abc', 123]);
  });

  it('Throws if the type is invalid', () => {
    expect(() => {
      blego.tools.validateTypeInArray('argument', 'number', ['abc']);
    }).toThrow();

    expect(invalidTypeInArraySpy).toHaveBeenCalledWith('argument', 'number', 'string');
  });

  it('Throws if the type is not in the array of types', () => {
    expect(() => {
      blego.tools.validateTypeInArray('argument', ['null', Array], [{}]);
    }).toThrow();

    expect(invalidTypeInArraySpy).toHaveBeenCalledWith('argument', 'null or array', 'object');
  });
});
