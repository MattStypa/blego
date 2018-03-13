describe('blego.Store.chunk', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Gets an array of array of specified length', () => {
    const store = new blego.Store([
      new blego.Record('1', {}),
      new blego.Record('2', {}),
      new blego.Record('3', {}),
    ]);

    const chunks = store.chunk(2);

    expect(chunks.length).toEqual(2);
    expect(chunks[0].length).toEqual(2);
    expect(chunks[1].length).toEqual(1);
  });
});
