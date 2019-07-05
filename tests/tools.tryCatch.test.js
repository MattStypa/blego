const throwingMock = require('jest/throwingMock.js');

describe('tools.tryCatch', () => {
  const tryCatch = require('lib/tools/tryCatch.js');

  it('runs the main function', () => {
    const func = jest.fn();
    const errorFunc = jest.fn();

    tryCatch(func, errorFunc);

    expect(func).toHaveBeenCalled();
    expect(errorFunc).not.toHaveBeenCalled();
  });

  it('Runs the error function if the main function throws', () => {
    const errorFunc = jest.fn();

    tryCatch(throwingMock, errorFunc);

    expect(throwingMock).toHaveBeenCalled();
    expect(errorFunc).toHaveBeenCalled();
  });

  it('Does not require the error function', () => {
    tryCatch(throwingMock);
  });
});
