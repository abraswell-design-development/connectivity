import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null
};


// Keeps user logged in for 24 hours
if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  } 
} 

const AuthContext = createContext({
  user: null,
  googleUser: null,
  photos: [],
  isAuth: false,
  userEmail: null,
  login: (userData) => {},
  setUserData: (returnedUser) => {},
  logout: () => {},
  updateUser: (userData) => {}
});


export function ContextReducer(state, { type, payload}) {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        user: payload 
      }
      ;
    case 'SET_USER_DATA':
      return {
        ...state,
        user: payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(ContextReducer, initialState);

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token || userData.tokenId)
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  function setUserData(returnedUser) {
    dispatch({
      type: 'SET_USER_DATA',
      payload: returnedUser
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
    value={{ user: state.user, photos: state.photos, googleUser: state.googleUser, isAuth: state.isAuth, login, setUserData, logout, dispatch }}
    {...props}
    />
  );
}

export { AuthContext, AuthProvider };