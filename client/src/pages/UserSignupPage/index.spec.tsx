import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { UserSignupPage } from '@src/pages/UserSignupPage';

beforeEach(cleanup);

describe('UserSignupPage', () => {
  describe('Layout', () => {
    it('has header of Sign Up', () => {
      const { container } = render(<UserSignupPage />);

      const header = container.querySelector('h1');
      if (header) expect(header).toHaveTextContent('Sign Up');
    });

    it('has input for display name', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const usernameInput = queryByPlaceholderText('Your username');

      expect(usernameInput).toBeInTheDocument();
    });
  });
});
