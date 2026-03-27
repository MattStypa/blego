import { describe, it, expect } from 'vitest';
import jailPath from '../lib/tools/jailPath.js';

describe('tools.jailPath', () => {

  it('Normalizes path to current directory', () => {
    expect(jailPath('a/b/../../c/d/e/..')).toEqual('c/d');
  });

  it('Prevents the path from escaping the current directory', () => {
    expect(jailPath('/../../a')).toEqual('a');
  });
});
