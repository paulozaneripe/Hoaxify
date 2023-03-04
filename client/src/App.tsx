import { UserSignUpPage } from '@src/pages/UserSignUpPage';
import * as apiCalls from '@src/api';

export const App = () => {
  const actions = {
    signUp: apiCalls.signUp,
  };

  return (
    <div className="App">
      <UserSignUpPage {...actions} />
    </div>
  );
};
