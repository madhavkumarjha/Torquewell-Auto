import '@testing-library/jest-dom';
import { vi } from 'vitest';

// jsdom does not implement scrollTo
if (typeof window !== 'undefined') {
  window.scrollTo = vi.fn();
}

