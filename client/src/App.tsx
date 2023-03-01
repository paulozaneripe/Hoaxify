import { UserSignupPage } from '@src/pages/UserSignupPage';

interface PostSignupProps {
  displayName: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export const App = () => {
  const actions = {
    postSignup: (data: PostSignupProps) => console.log(data),
  };

  return (
    <div className="App">
      <UserSignupPage {...actions} />
    </div>
  );
};
