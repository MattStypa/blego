describe('tools.validateTypeInArray', () => {
  const errors = require('lib/errors.js');
  const validateTypeInArray = require('lib/tools/validateTypeInArray.js');

  const invalidTypeInArraySpy = jest.spyOn(errors, 'invalidTypeInArray');

  it('Validates types', () => {
    validateTypeInArray(null, 'null', [null, null]);
    validateTypeInArray(null, 'string', ['abc', 'def']);
    validateTypeInArray(null, 'number', [123, 456]);
    validateTypeInArray(null, 'array', [[], []]);
    validateTypeInArray(null, 'object', [{}, {}]);
  });

  it('Validates against array of types', () => {
    validateTypeInArray(null, ['null', 'string', 'number'], [null, 'abc', 123]);
  });

  it('Throws if the type is invalid', () => {
    expect(() => {
      validateTypeInArray('argument', 'number', ['abc']);
    }).toThrow();

    expect(invalidTypeInArraySpy).toHaveBeenCalledWith('argument', 'number', 'string');
  });

  it('Throws if the type is not in the array of types', () => {
    expect(() => {
      validateTypeInArray('argument', ['null', 'array'], [{}]);
    }).toThrow();

    expect(invalidTypeInArraySpy).toHaveBeenCalledWith('argument', ['null', 'array'], 'object');
  });
});
