import { UserSignUpPage } from '@src/pages/UserSignUpPage';
import * as apiCalls from '@src/api';

export const App = () => {
  const actions = {
    postSignUp: apiCalls.signUp,
  };

  return (
    <div className="App">
      <UserSignUpPage {...actions} />
    </div>
  );
};
