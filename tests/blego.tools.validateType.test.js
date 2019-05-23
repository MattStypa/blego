describe('blego.tools.validateType', () => {
  const blego = require('Blego.js');
  const invalidTypeSpy = jest.spyOn(blego.tools.errors, 'invalidType');

  it('Validates types', () => {
    blego.tools.validateType(null, 'null', null);
    blego.tools.validateType(null, 'string', 'abc');
    blego.tools.validateType(null, 'number', 123);
    blego.tools.validateType(null, 'object', {});
    blego.tools.validateType(null, 'function', () => {});
    blego.tools.validateType(null, Array, []);
    blego.tools.validateType(null, Object, {});
  });

  it('Validates against array of types', () => {
    blego.tools.validateType(null, ['null', 'string', 'number'], null);
    blego.tools.validateType(null, ['null', 'string', 'number'], 'abc');
    blego.tools.validateType(null, ['null', 'string', 'number'], 123);
  });

  it('Throws if the type is invalid', () => {
    expect(() => {
      blego.tools.validateType('argument', 'number', 'abc');
    }).toThrow();

    expect(invalidTypeSpy).toHaveBeenCalledWith('argument', 'number', 'string');
  });

  it('Throws if the type is not in the array of types', () => {
    expect(() => {
      blego.tools.validateType('argument', ['null', Array], {});
    }).toThrow();

    expect(invalidTypeSpy).toHaveBeenCalledWith('argument', 'null or array', 'object');
  });
});
