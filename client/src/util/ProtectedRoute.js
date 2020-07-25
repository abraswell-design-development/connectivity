import React, { useContext, useReducer } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);
  const pleaseWork = useReducer()
  
  console.log(pleaseWork)


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