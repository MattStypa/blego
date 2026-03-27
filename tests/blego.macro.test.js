import { describe, it, expect, vi } from 'vitest';
import blego from '../core.js';
import handlebars from '../lib/handlebars.js';

describe('blego.macro', () => {

  it('Registers a helper', () => {
    const macro = vi.fn();
    blego.macro('macro', macro);
    handlebars.helpers.macro();

    expect(macro).toHaveBeenCalled();
  });
});
