describe('tools.validateType', () => {
  const errors = require('lib/errors.js');
  const validateType = require('lib/tools/validateType.js');

  const invalidTypeSpy = jest.spyOn(errors, 'invalidType');

  it('Validates types', () => {
    validateType(null, 'null', null);
    validateType(null, 'string', 'abc');
    validateType(null, 'number', 123);
    validateType(null, 'array', []);
    validateType(null, 'object', {});
    validateType(null, 'function', () => {});
    validateType(null, Array, []);
    validateType(null, Object, {});
  });

  it('Validates against array of types', () => {
    validateType(null, ['null', 'string', 'number'], null);
    validateType(null, ['null', 'string', 'number'], 'abc');
    validateType(null, ['null', 'string', 'number'], 123);
  });

  it('Throws if the type is invalid', () => {
    expect(() => {
      validateType('argument', 'number', 'abc');
    }).toThrow();

    expect(invalidTypeSpy).toHaveBeenCalledWith('argument', 'number', 'string');
  });

  it('Throws if the type is not in the array of types', () => {
    expect(() => {
      validateType('argument', ['null', 'array'], {});
    }).toThrow();

    expect(invalidTypeSpy).toHaveBeenCalledWith('argument', ['null', 'array'], 'object');
  });
});
