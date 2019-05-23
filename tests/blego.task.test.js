describe('blego.task', () => {
  const blego = require('Blego.js');

  it('Runs a task', () => {
    const task = jest.fn();

    blego.task('Task', task);

    expect(task).toHaveBeenCalled();
  });
});
