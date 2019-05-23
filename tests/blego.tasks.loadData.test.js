describe('blego.tasks.loadData', () => {
  const nodePath = require('path');
  const tempDir = require('../jest/tempDir.js');
  const mockExit = require('../jest/mockExit.js');
  const throwingMock = require('../jest/throwingMock.js');
  const blego = require('Blego.js');
  const noTypeSpy = jest.spyOn(blego.tools.errors, 'noType');
  const noParserSpy = jest.spyOn(blego.tools.errors, 'noParser');
  const cantParseSpy = jest.spyOn(blego.tools.errors, 'cantParse');

  beforeEach(() => {
    tempDir({
      'data/authors/joe.json': '{"name": "joe"}',
      'data/authors/bob.yaml': 'name: bob',
      'data/authors/editors/matt.js': `module.exports = {name: 'matt'}`,
      'data/posts/a.md': '# Title',
      'data/posts/b.html': '<h1>Title</h1>',
    });
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Loads data into stores', () => {
    blego.tasks.loadData();

    expect(blego.store.authors.count()).toEqual(3);
    expect(blego.store.posts.count()).toEqual(2);
  });

  it('Loads data from sub directories', () => {
    blego.tasks.loadData();

    expect(blego.store.authors.get('editors/matt').name).toEqual('matt');
  });

  it('parses json files', () => {
    blego.tasks.loadData();

    expect(blego.store.authors.get('joe').name).toEqual('joe');
  });

  it('parses yaml files', () => {
    blego.tasks.loadData();

    expect(blego.store.authors.get('bob').name).toEqual('bob');
  });

  it('parses js files', () => {
    blego.tasks.loadData();

    expect(blego.store.authors.get('editors/matt').name).toEqual('matt');
  });

  it('parses md files', () => {
    blego.tasks.loadData();

    expect(blego.store.posts.get('a').body).toEqual(expect.stringMatching(/<h1.*>Title<\/h1>/));
  });

  it('parses html files', () => {
    blego.tasks.loadData();

    expect(blego.store.posts.get('b').body).toEqual(expect.stringMatching(/<h1>Title<\/h1>/));
  });

  it('Dies if data file has no type', () => {
    tempDir({
      'data/authors/matt': '{"name": "matt"}',
    });

    const mock = mockExit(() => {
      blego.tasks.loadData();
    });

    expect(mock).toHaveBeenCalled();
    expect(noTypeSpy).toHaveBeenCalledWith(nodePath.resolve('data/authors/matt'));
  });

  it('Dies if data file has unknown type', () => {
    tempDir({
      'data/authors/matt.data': '{"name": "matt"}',
    });

    const mock = mockExit(() => {
      blego.tasks.loadData();
    });

    expect(mock).toHaveBeenCalled();
    expect(noParserSpy).toHaveBeenCalledWith(nodePath.resolve('data/authors/matt.data'));
  });

  it('Dies if parsing fails', () => {
    const original = blego.parsers.json;
    blego.parsers.json = throwingMock

    const mock = mockExit(() => {
      blego.tasks.loadData();
    });

    blego.parsers.json = original

    expect(mock).toHaveBeenCalled();
    expect(cantParseSpy).toHaveBeenCalledWith(nodePath.resolve('data/authors/joe.json'));
  });
});
