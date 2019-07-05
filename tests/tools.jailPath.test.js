describe('tools.jailPath', () => {
  const jailPath = require('lib/tools/jailPath.js');

  it('Normalizes path to current directory', () => {
    expect(jailPath('a/b/../../c/d/e/..')).toEqual('c/d');
  });

  it('Prevents the path from escaping the current directory', () => {
    expect(jailPath('/../../a')).toEqual('a');
  });
});
