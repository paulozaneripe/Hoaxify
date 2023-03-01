import { UserSignupPage } from '@src/pages/UserSignupPage';
import * as apiCalls from '@src/api/apiCalls';

interface PostSignupProps {
  displayName: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export const App = () => {
  const actions = {
    postSignup: apiCalls.signup,
  };

  return (
    <div className="App">
      <UserSignupPage {...actions} />
    </div>
  );
};
