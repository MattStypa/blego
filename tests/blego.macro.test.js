import { describe, it, expect, vi } from 'vitest';
import blego from '../core';
import handlebars from '../lib/handlebars';

describe('blego.macro', () => {
  it('Registers a helper', () => {
    const macro = vi.fn();
    blego.macro('macro', macro);
    handlebars.helpers.macro();

    expect(macro).toHaveBeenCalled();
  });
});
