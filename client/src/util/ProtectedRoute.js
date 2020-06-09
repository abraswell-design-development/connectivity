import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { JWTContext } from '../context/jwt-auth';


function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = useContext(JWTContext);


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