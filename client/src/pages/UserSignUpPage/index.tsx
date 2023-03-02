import { UserSignUpPageProps } from '@src/ts/interfaces/UserSignUpPageProps';
import { ChangeEvent, FormEvent, useState } from 'react';

export const UserSignUpPage = (actions: UserSignUpPageProps) => {
  const [signUpData, setSignUpData] = useState({
    displayName: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  });

  const [pendingApi, setPendingApi] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });

  const onClickSignUp = (e: FormEvent) => {
    e.preventDefault();
    if (actions.postSignUp) {
      setPendingApi(true);
      actions
        .postSignUp(signUpData)
        .then((response: any) => setPendingApi(false))
        .catch((error: any) => setPendingApi(false));
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Sign Up</h1>
      <form method="post" onSubmit={(e) => onClickSignUp(e)}>
        <div className="col-12 mb-3">
          <label htmlFor="displayName">Display Name</label>
          <input
            className="form-control"
            name="displayName"
            placeholder="Your display name"
            type="text"
            value={signUpData.displayName}
            onChange={onChange}
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            name="username"
            placeholder="Your username"
            type="text"
            value={signUpData.username}
            onChange={onChange}
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            name="password"
            placeholder="Your password"
            type="password"
            value={signUpData.password}
            onChange={onChange}
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="passwordConfirmation">Password confirmation</label>
          <input
            className="form-control"
            name="passwordConfirmation"
            placeholder="Repeat your password"
            type="password"
            value={signUpData.passwordConfirmation}
            onChange={onChange}
          />
        </div>
        <div className="text-center">
          <button
            disabled={pendingApi}
            className="btn btn-primary w-100 mt-2"
            type="submit"
          >
            {pendingApi && (
              <div className="spinner-border text-light spinner-border-sm mx-2">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
