import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Context } from '../context/auth';

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
}

export default AuthRoute;