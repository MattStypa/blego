describe('blego.tools.tryCatch', () => {
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
    const func = jest.fn(() => {throw new Error()});
    const errorFunc = jest.fn();

    blego.tools.tryCatch(func, errorFunc);

    expect(func).toHaveBeenCalled();
    expect(errorFunc).toHaveBeenCalled();
  });
});
