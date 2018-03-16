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

  it('Initializes without options', () => {
    expect(blego.isBlego).toBe(true);
    expectValidOptions(blego.options);
  });

  it('Initializes with options', () => {
    const options = {
      plugins: [jest.fn()],
      paths: {
        'dest': 'test-dist',
        'static': 'test-static',
        'data': 'test-data',
        'globals': 'test-globals',
        'template': 'test-template',
        'partials': 'test-partials',
      }
    };

    const blego = new Blego(options);

    expectValidOptions(blego.options);
    expect(blego.options.debugPath).toBe(options.debugPath);
    expect(blego.options.plugins).toEqual(expect.arrayContaining(options.plugins));
    expect(blego.options.paths.dest).toBe(options.paths.dest);
    expect(blego.options.paths.static).toBe(options.paths.static);
    expect(blego.options.paths.data).toBe(options.paths.data);
    expect(blego.options.paths.globals).toBe(options.paths.globals);
    expect(blego.options.paths.template).toBe(options.paths.template);
    expect(blego.options.paths.partials).toBe(options.paths.partials);
  });

  describe('Options', () => {
    describe('plugins', () => {
      it('Must be an array', () => {
        new Blego({plugins: {}});

        expect(invalidTypeSpy).toHaveBeenCalledWith('plugins', 'array', 'object');
      });

      it('Must contain functions', () => {
        new Blego({plugins: ['not a functions']});

        expect(invalidTypeInArraySpy).toHaveBeenCalledWith('plugins', 'function', 'string');
      });
    });

    describe('paths', () => {
      it('Must be an object', () => {
        new Blego({paths: 0});

        expect(invalidTypeSpy).toHaveBeenCalledWith('paths', 'object', 'number');
      });

      ['dest', 'static', 'data', 'globals', 'template', 'partials'].forEach((key) => {
        describe(key, () => {
          it('Must be a strings', () => {
            const keyPath = ['paths', key].join('.');
            let options = {paths: {}};
            options.paths[key] = 0;
            new Blego(options);

            expect(invalidTypeSpy).toHaveBeenCalledWith(keyPath, 'string', 'number');
          });
        });
      });
    });
  });

  it('Activates plugins', () => {
    const plugin = jest.fn();
    const blego = new Blego({plugins: [plugin]});
    expect(plugin).toHaveBeenCalledWith(blego);
  });

  function expectValidOptions(options) {
    expect(typeof options).toBe('object');
    expect(Array.isArray(options.plugins)).toBe(true);
    expect(typeof options.paths).toBe('object');
    expect(typeof options.paths.dest).toBe('string');
    expect(typeof options.paths.static).toBe('string');
    expect(typeof options.paths.data).toBe('string');
    expect(typeof options.paths.globals).toBe('string');
    expect(typeof options.paths.template).toBe('string');
    expect(typeof options.paths.partials).toBe('string');
  }
});
