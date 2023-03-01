import { UserSignupPageProps } from '@src/ts/interfaces/UserSignupPageProps';
import { ChangeEvent, FormEvent, useState } from 'react';

export const UserSignupPage = (actions: UserSignupPageProps) => {
  const [signUpData, setSignUpData] = useState({
    displayName: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });

  const onClickSignup = (e: FormEvent) => {
    e.preventDefault();
    if (actions.postSignup) actions.postSignup(signUpData);
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form method="post" onSubmit={(e) => onClickSignup(e)}>
        <div>
          <input
            name="displayName"
            placeholder="Your display name"
            type="text"
            value={signUpData.displayName}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            name="username"
            placeholder="Your username"
            type="text"
            value={signUpData.username}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            name="password"
            placeholder="Your password"
            type="password"
            value={signUpData.password}
            onChange={onChange}
          />
        </div>
        <div>
          <input
            name="passwordConfirmation"
            placeholder="Repeat your password"
            type="password"
            value={signUpData.passwordConfirmation}
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};
