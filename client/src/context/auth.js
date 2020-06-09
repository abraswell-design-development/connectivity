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
} else if (localStorage.getItem('googleToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('googleToken'));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('googleToken');
  } else {
    initialState.user = decodedToken;
  }
}

export const Context = createContext({
  user: null,
  isAuth: false,
  login: (userData) => {},
  logout: () => {}
});

export function ContextReducer(state, { type, payload}) {
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
    default:
      return state;
  }
}

export function ContextProvider(props) {
  const [state, dispatch] = useReducer(ContextReducer, initialState);

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
    // console.log(localStorage)
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  return (
      <Context.Provider
        value={{ user: state.user, isAuth: state.isAuth, login, logout }}
        {...props}
      />
  )
}