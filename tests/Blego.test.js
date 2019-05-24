const fs = require('fs-extra');

describe('Blego', () => {
  const Blego = require('Blego.js');
  const paths = require('paths');
  const tempDir = require('../jest/tempDir.js');
  const mockExit = require('../jest/mockExit.js');
  let blego;

  beforeEach(() => {
    tempDir({
      'globals/config.json': '{"siteName": "test"}',
      'data/authors/joe.json': '{"name": "joe"}',
      'data/authors/bob.yaml': 'name: bob',
      'data/authors/editors/matt.js': `module.exports = {name: 'matt'}`,
      'data/posts/a.md': '# Title',
      'data/posts/b.html': '<h1>Title</h1>',
      'static/file': '',
      'static/directory/file': '',
      'template/partials/file.html': 'file content',
      'dist/old_file': 'file content',
    });

    blego = new Blego();
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Cleans up the destination directory', () => {
    expect(fs.readdirSync('dist')).toEqual(expect.not.arrayContaining(['old_file']));
  });

  it('Copies static directory to destination directory', () => {
    expect(fs.readdirSync('dist')).toEqual(['directory', 'file']);
    expect(fs.readdirSync('dist/directory')).toEqual(['file']);
  });

  describe('Data loading', () => {
    it('Loads data into stores', () => {
      expect(blego.data.authors.count()).toEqual(3);
      expect(blego.data.posts.count()).toEqual(2);
    });

    it('Loads data from sub directories', () => {
      expect(blego.data.authors.get('editors/matt').name).toEqual('matt');
    });

    it('parses json files', () => {
      expect(blego.data.authors.get('joe').name).toEqual('joe');
    });

    it('parses yaml files', () => {
      expect(blego.data.authors.get('bob').name).toEqual('bob');
    });

    it('parses js files', () => {
      expect(blego.data.authors.get('editors/matt').name).toEqual('matt');
    });

    it('parses md files', () => {
      expect(blego.data.posts.get('a').body).toEqual(expect.stringMatching(/<h1.*>Title<\/h1>/));
    });

    it('parses html files', () => {
      expect(blego.data.posts.get('b').body).toEqual(expect.stringMatching(/<h1>Title<\/h1>/));
    });

    it('Dies if data file has no type', () => {
      tempDir({
        'data/authors/matt': '{"name": "matt"}',
      });

      const mock = mockExit(() => {
        blego = new Blego();
      });

      expect(mock).toHaveBeenCalled();
      expect(noTypeSpy).toHaveBeenCalledWith(nodePath.resolve('data/authors/matt'));
    });

    it('Dies if data file has unknown type', () => {
      tempDir({
        'data/authors/matt.data': '{"name": "matt"}',
      });

      const mock = mockExit(() => {
        blego = new Blego();
      });

      expect(mock).toHaveBeenCalled();
      expect(noParserSpy).toHaveBeenCalledWith(nodePath.resolve('data/authors/matt.data'));
    });

    it('Dies if parsing fails', () => {
      const original = blego.parsers.json;
      blego.parsers.json = throwingMock

      const mock = mockExit(() => {
        blego = new Blego();
      });

      blego.parsers.json = original

      expect(mock).toHaveBeenCalled();
      expect(cantParseSpy).toHaveBeenCalledWith(nodePath.resolve('data/authors/joe.json'));
    });
  });
});
