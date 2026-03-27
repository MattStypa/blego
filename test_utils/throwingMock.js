import { vi } from 'vitest';

export default vi.fn(() => {
  throw new Error();
});
