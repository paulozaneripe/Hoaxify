import { api } from '@src/api';
import { vi } from 'vitest';
import * as apiCalls from '@src/api';

describe('axios', () => {
  describe('signup', () => {
    it('calls /api/1.0/users', () => {
      const mockSignup = vi.fn();
      api.post = mockSignup;
      apiCalls.signup({});

      const path = mockSignup.mock.calls[0][0];

      expect(path).toBe('/api/1.0/users');
    });
  });
});
