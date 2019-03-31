describe('blego.tools.tryCatch', () => {
  const throwingMock = require('../jest/throwingMock.js');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('runs the main function', () => {
    const func = jest.fn();
    const errorFunc = jest.fn();

    blego.tools.tryCatch(func, errorFunc);

    expect(func).toHaveBeenCalled();
    expect(errorFunc).not.toHaveBeenCalled();
  });

  it('Runs the error function if the main function throws', () => {
    const errorFunc = jest.fn();

    blego.tools.tryCatch(throwingMock, errorFunc);

    expect(throwingMock).toHaveBeenCalled();
    expect(errorFunc).toHaveBeenCalled();
  });

  it('Does not require the error function', () => {
    blego.tools.tryCatch(throwingMock);
  });
});
