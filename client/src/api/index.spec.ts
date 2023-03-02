import { api } from '@src/api';
import * as apiCalls from '@src/api';
import { vi } from 'vitest';

describe('axios', () => {
  describe('signUp', () => {
    it('calls /api/1.0/users', () => {
      const mockSignUp = vi.fn();
      api.post = mockSignUp;
      apiCalls.signUp({
        displayName: '',
        username: '',
        password: '',
        passwordConfirmation: '',
      });

      const path = mockSignUp.mock.calls[0][0];

      expect(path).toBe('/api/1.0/users');
    });
  });
});
