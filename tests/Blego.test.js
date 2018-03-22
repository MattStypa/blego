describe('Blego', () => {
  const Blego = require('Blego.js');
  const errors = require('errors.js');
  const invalidTypeSpy = jest.spyOn(errors, 'invalidType');
  const invalidTypeInArraySpy = jest.spyOn(errors, 'invalidTypeInArray');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    process.exit = jest.fn();
    invalidTypeSpy.mockClear();
    invalidTypeInArraySpy.mockClear();
    blego = new Blego();
  });

  it('Initializes without paths', () => {
    expect(blego.isBlego).toBe(true);
    expectValidPaths(blego.paths);
  });

  it('Initializes with paths', () => {
    const paths = {
      'dest': 'test-dist',
      'static': 'test-static',
      'data': 'test-data',
      'globals': 'test-globals',
      'template': 'test-template',
      'partials': 'test-partials',
    };

    const blego = new Blego(paths);

    expectValidPaths(blego.paths);
    expect(blego.paths.dest).toBe(paths.dest);
    expect(blego.paths.static).toBe(paths.static);
    expect(blego.paths.data).toBe(paths.data);
    expect(blego.paths.globals).toBe(paths.globals);
    expect(blego.paths.template).toBe(paths.template);
    expect(blego.paths.partials).toBe(paths.partials);
  });

  describe('Paths', () => {
    it('Must be an object', () => {
      new Blego(0);

      expect(invalidTypeSpy).toHaveBeenCalledWith('paths', 'object', 'number');
    });

    ['dest', 'static', 'data', 'globals', 'template', 'partials'].forEach((key) => {
      describe(key, () => {
        it('Must be a strings', () => {
          const keyPath = ['paths', key].join('.');
          let paths = {};
          paths[key] = 0;
          new Blego(paths);

          expect(invalidTypeSpy).toHaveBeenCalledWith(keyPath, 'string', 'number');
        });
      });
    });
  });

  function expectValidPaths(paths) {
    expect(typeof paths).toBe('object');
    expect(typeof paths.dest).toBe('string');
    expect(typeof paths.static).toBe('string');
    expect(typeof paths.data).toBe('string');
    expect(typeof paths.globals).toBe('string');
    expect(typeof paths.template).toBe('string');
    expect(typeof paths.partials).toBe('string');
  }
});
