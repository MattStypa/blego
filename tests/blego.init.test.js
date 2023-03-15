const fs = require('fs-extra');
const tempDir = require('jest_utils/tempDir.js');

describe('Blego', () => {
  const blego = require('core.js');
  const handlebars = require('lib/handlebars.js');

  beforeEach(() => {
    tempDir({
      'globals/config.json': '{"siteName": "test"}',
      'data/authors/a.json': '{"name": "a"}',
      'data/authors/b.yaml': 'name: b',
      'data/posts/c.md': '# C',
      'data/posts/d.html': '<h1>D</h1>',
      'static/file': '',
      'static/directory/file': '',
      'template/file.html': 'file content',
      'dist/old_file': 'file content',
    });

    blego.dump = jest.fn();
    blego.dd = jest.fn();

    blego.init();
  });

  afterEach(() => {
    tempDir.restore();
  });

  it('Sets macros', () => {
    handlebars.helpers.dump();
    handlebars.helpers.dd();

    expect(blego.dump).toHaveBeenCalled();
    expect(blego.dd).toHaveBeenCalled();
  });

  it('Loads templates', () => {
    expect(handlebars.partials['file.html']).toEqual('file content');
  });

  it('Loads globals', () => {
    expect(blego.global.config.siteName).toEqual('test');
  });

  it('Cleans up the destination directory', () => {
    expect(fs.readdirSync('dist')).toEqual(expect.not.arrayContaining(['old_file']));
  });

  it('Copies static directory to destination directory', () => {
    expect(fs.readdirSync('dist')).toEqual(['directory', 'file']);
    expect(fs.readdirSync('dist/directory')).toEqual(['file']);
  });

  it('Loads data into stores', () => {
    expect(blego.data.authors.get('a').name).toEqual('a');
    expect(blego.data.authors.get('b').name).toEqual('b');
    expect(blego.data.posts.get('c').body).toEqual(expect.stringMatching(/<h1.*>C<\/h1>/));
    expect(blego.data.posts.get('d').body).toEqual(expect.stringMatching(/<h1>D<\/h1>/));
  });
});
