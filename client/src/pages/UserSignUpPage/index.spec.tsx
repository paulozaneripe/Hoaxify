import {
  render,
  cleanup,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserSignUpPage } from '@src/pages/UserSignUpPage';
import { UserSignUpPageProps } from '@src/ts/interfaces/UserSignUpPageProps';

beforeEach(cleanup);

describe('UserSignUpPage', () => {
  describe('Layout', () => {
    it('has header of Sign Up', () => {
      const { container } = render(<UserSignUpPage />);

      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('Sign Up');
    });

    it('has input for displayName', () => {
      const { queryByPlaceholderText } = render(<UserSignUpPage />);
      const displaynameInput = queryByPlaceholderText('Your display name');

      expect(displaynameInput).toBeInTheDocument();
    });

    it('has input for username', () => {
      const { queryByPlaceholderText } = render(<UserSignUpPage />);
      const usernameInput = queryByPlaceholderText('Your username');

      expect(usernameInput).toBeInTheDocument();
    });

    it('has input for password', () => {
      const { queryByPlaceholderText } = render(<UserSignUpPage />);
      const passwordInput = queryByPlaceholderText('Your password');

      expect(passwordInput).toBeInTheDocument();
    });

    it('has password type for password input ', () => {
      const { queryByPlaceholderText } = render(<UserSignUpPage />);
      const passwordInput = queryByPlaceholderText(
        'Your password',
      ) as HTMLInputElement;

      expect(passwordInput.type).toBe('password');
    });

    it('has input for passwordConfirmation', () => {
      const { queryByPlaceholderText } = render(<UserSignUpPage />);
      const passwordRepeatInput = queryByPlaceholderText(
        'Repeat your password',
      );

      expect(passwordRepeatInput).toBeInTheDocument();
    });

    it('has password type for passwordConfirmation input ', () => {
      const { queryByPlaceholderText } = render(<UserSignUpPage />);
      const passwordConfirmationInput = queryByPlaceholderText(
        'Repeat your password',
      ) as HTMLInputElement;

      expect(passwordConfirmationInput.type).toBe('password');
    });

    it('has submit button', () => {
      const { container } = render(<UserSignUpPage />);
      const button = container.querySelector('button');

      expect(button).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    const changeEvent = (value: string) => {
      return {
        target: {
          value,
        },
      };
    };

    const mockAsyncDelayed = () => {
      return vi.fn().mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(() => resolve({}), 100);
        });
      });
    };

    let button: HTMLButtonElement,
      displayName,
      username,
      password,
      passwordConfirmation;

    const setupForSubmit = (actions?: UserSignUpPageProps) => {
      const rendered = render(<UserSignUpPage {...actions} />);
      const { container, queryByPlaceholderText } = rendered;

      displayName = queryByPlaceholderText(
        'Your display name',
      ) as HTMLInputElement;
      username = queryByPlaceholderText('Your username') as HTMLInputElement;
      password = queryByPlaceholderText('Your password') as HTMLInputElement;
      passwordConfirmation = queryByPlaceholderText(
        'Repeat your password',
      ) as HTMLInputElement;

      fireEvent.change(displayName, changeEvent('display-name-test'));
      fireEvent.change(username, changeEvent('username-test'));
      fireEvent.change(password, changeEvent('password-test'));
      fireEvent.change(
        passwordConfirmation,
        changeEvent('password-confirmation-test'),
      );

      button = container.querySelector('button') as HTMLButtonElement;
      return rendered;
    };

    it('sets the displayName value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignUpPage />);
      const displayNameInput = queryByPlaceholderText(
        'Your display name',
      ) as HTMLInputElement;

      fireEvent.change(displayNameInput, changeEvent('display-name-test'));

      expect(displayNameInput).toHaveValue('display-name-test');
    });

    it('sets the username value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignUpPage />);
      const usernameInput = queryByPlaceholderText(
        'Your username',
      ) as HTMLInputElement;

      fireEvent.change(usernameInput, changeEvent('username-test'));

      expect(usernameInput).toHaveValue('username-test');
    });

    it('sets the password value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignUpPage />);
      const passwordInput = queryByPlaceholderText(
        'Your password',
      ) as HTMLInputElement;

      fireEvent.change(passwordInput, changeEvent('password-test'));

      expect(passwordInput).toHaveValue('password-test');
    });

    it('sets the passwordConfirmation value into state', () => {
      const { queryByPlaceholderText } = render(<UserSignUpPage />);
      const passwordConfirmationInput = queryByPlaceholderText(
        'Repeat your password',
      ) as HTMLInputElement;

      fireEvent.change(
        passwordConfirmationInput,
        changeEvent('password-confirmation-test'),
      );

      expect(passwordConfirmationInput).toHaveValue(
        'password-confirmation-test',
      );
    });

    it('calls signUp when the fields are valid and the actions are provided in props', () => {
      const actions = {
        signUp: vi.fn().mockResolvedValueOnce({}),
      };

      setupForSubmit(actions);
      fireEvent.click(button);
      expect(actions.signUp).toHaveBeenCalledOnce();
    });

    it('does not throw exception when clicking the button when actions not provided in props', () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it('calls post with user body when the fields are valid', () => {
      const actions = {
        signUp: vi.fn().mockResolvedValue({}),
      };

      setupForSubmit(actions);
      fireEvent.click(button);

      const expectedSignUpData = {
        displayName: 'display-name-test',
        username: 'username-test',
        password: 'password-test',
        passwordConfirmation: 'password-confirmation-test',
      };

      expect(actions.signUp).toHaveBeenCalledWith(expectedSignUpData);
    });

    it('does not allow user to click the Sign Up button when there is an ongoing api call', () => {
      const actions = {
        signUp: mockAsyncDelayed(),
      };

      setupForSubmit(actions);

      fireEvent.click(button);
      fireEvent.click(button);

      expect(actions.signUp).toHaveBeenCalledOnce();
    });

    it('displays spinner when there is an ongoing api call', () => {
      const actions = {
        signUp: mockAsyncDelayed(),
      };

      const { queryByText } = setupForSubmit(actions);
      fireEvent.click(button);

      const spinner = queryByText('Loading...');

      expect(spinner).toBeInTheDocument();
    });

    it('hide spinner after api call finishes successfully', async () => {
      const actions = {
        signUp: mockAsyncDelayed(),
      };

      const { queryByText } = setupForSubmit(actions);
      fireEvent.click(button);

      const spinner = queryByText('Loading...');
      await waitForElementToBeRemoved(spinner);

      expect(spinner).not.toBeInTheDocument();
    });

    it('hide spinner after api call finishes with error', async () => {
      const actions = {
        signUp: vi.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            setTimeout(
              () =>
                reject({
                  response: {
                    data: {},
                  },
                }),
              200,
            );
          });
        }),
      };

      const { queryByText } = setupForSubmit(actions);
      fireEvent.click(button);

      const spinner = queryByText('Loading...');
      await waitForElementToBeRemoved(spinner);

      expect(spinner).not.toBeInTheDocument();
    });
  });
});
