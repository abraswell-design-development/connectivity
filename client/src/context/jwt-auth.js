import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

export const JWTContext = createContext({
  user: null,
  isAuth: false,
  login: (userData) => {},
  logout: () => {}
});

export function JWTReducer(state, { type, payload}) {
  switch (type) {
    case 'LOGIN':
      console.log('ran LOGIN case')
      return {
        ...state,
        user: payload
      };
    case 'LOGOUT':
      console.log('ran LOGOUT case')
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

export function JWTProvider(props) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  return (
      <JWTContext.Provider
        value={{ user: state.user, isAuth: state.isAuth, login, logout }}
        {...props}
      />
  )
}

