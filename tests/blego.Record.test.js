describe('blego.Record', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Creates a Record object with key and props', () => {
    const record = new blego.Record('key', {
      name: 'Blego',
    });

    expect(record).toEqual({
      key: 'key',
      name: 'Blego',
    });
  });

  it('Requires a key', () => {
    expect(() => {
      new blego.Record('', {});
    }).toThrow();
  });
});
