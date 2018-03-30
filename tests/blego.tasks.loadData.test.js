describe('blego.tasks.loadData', () => {
  const mockFs = require('mock-fs');
  const Blego = require('Blego.js');
  let blego;

  beforeEach(() => {
    console.log = jest.fn();
    blego = new Blego();
    new blego.Store([]);
    mockFs({
      'data/authors/matt.json': '{"name": "matt"}',
      'data/posts/a.json': '{"id": "a"}',
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('Loads data into stores', () => {
    blego.tasks.loadData();

    expect(blego.store.authors.count()).toEqual(1);
    expect(blego.store.posts.count()).toEqual(1);
    expect(blego.store.authors.get('matt').name).toEqual('matt');
    expect(blego.store.posts.get('a').id).toEqual('a');
  });
});
