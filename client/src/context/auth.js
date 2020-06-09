import React, { useContext,useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null
};

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    console.log('auth.js decode token initialState: ', initialState)
    initialState.user = decodedToken;
  }
}

const Context = createContext({
  user: null,
  currentUser: null,
  isAuth: false,
  userEmail: null,
  login: (userData) => {},
  logout: () => {}
});

export function ContextReducer(state, { type, payload}) {
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
      case 'LOGIN_GOOGLE_USER':
      console.log('ran LOGIN_GOOGLE_USER case')
      return {
        ...state,
        user: payload,
      }
    case 'IS_GOOGLE_USER_LOGGED_IN':
      console.log('ran IS_GOOGLE_USER_LOGGED_IN case')
      return {
        ...state,
        isAuth: payload,
      }
    default:
      return state;
  }
}

export function AuthProvider(props) {
  const initialState = useContext(Context)
  const [state, dispatch] = useReducer(ContextReducer, initialState);
  console.log('auth.js dispatch:', dispatch)

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
      <Context.Provider
        value={{ user: state.user, currentUser: state.currentUser, isAuth: state.isAuth, login, logout }}
        {...props}
      />
  )
}

export default Context