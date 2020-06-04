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

export const AuthContext = createContext({
  user: null,
  currentUser: null,
  isAuth: false,
  login: (userData) => {},
  logout: () => {}
});



function authReducer(state, { type, payload}) {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    case 'LOGIN_GOOGLE_USER':
      return {
        ...state,
        currentUser: payload,
      }
    case 'IS_GOOGLE_USER_LOGGED_IN':
      return {
        ...state,
        isAuth: payload,
      }
    default:
      return state;
  }
}

export function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

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
    <AuthContext.Provider
      value={{ user: state.user, currentUser: state.currentUser,
        isAuth: state.isAuth,  login, logout }}
      {...props}
    />
  );
}

