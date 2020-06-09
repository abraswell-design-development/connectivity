import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Context from '../context/auth';

function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = useContext(Context);
  // console.log(user)

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
}

export default ProtectedRoute;