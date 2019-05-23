jest.mock('Blego/init.js');

describe('Blego', () => {
  const blego = require('Blego.js');
  const init = require('Blego/init.js');
  const invalidTypeSpy = jest.spyOn(errors, 'invalidType');
  const invalidTypeInArraySpy = jest.spyOn(errors, 'invalidTypeInArray');

  beforeEach(() => {
    process.exit = jest.fn();
    invalidTypeSpy.mockClear();
    invalidTypeInArraySpy.mockClear();
  });

  it('Runs init', () => {
    blego.init();

    expect(init).toHaveBeenCalled();
  });

  it('Initializes without paths', () => {
    expect(blego.isBlego).toBe(true);
    expectValidPaths(blego.internal.paths);
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

    expectValidPaths(blego.internal.paths);
    expect(blego.internal.paths.dest).toBe(paths.dest);
    expect(blego.internal.paths.static).toBe(paths.static);
    expect(blego.internal.paths.data).toBe(paths.data);
    expect(blego.internal.paths.globals).toBe(paths.globals);
    expect(blego.internal.paths.template).toBe(paths.template);
    expect(blego.internal.paths.partials).toBe(paths.partials);
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
