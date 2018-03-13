describe('blego.task', () => {
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
  });

  it('Runs a task', () => {
    const task = jest.fn();

    blego.task('Task', task);

    expect(task).toHaveBeenCalled();
  });
});
