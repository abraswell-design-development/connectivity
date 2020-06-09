import React, { useReducer, createContext } from 'react';


const initialState = {
  user: null
};

export const GoogleContext = createContext({
  user: null,
  isAuth: false,
  login: (googleUser) => {},
  logout: () => {}
});


export function GoogleReducer(state, { type, payload}) {
  switch (type) {
    case 'LOGIN_GOOGLE_USER':
      console.log('ran LOGIN_GOOGLE_USER case')
      return {
        ...state,
        user: payload,
      }
    case 'IS_GOOGLE_USER_LOGGED_IN':
      console.log('ran IS_GOOGLE_USER_LOGGED_IN')
      return {
        ...state,
        isAuth: payload,
      }
    default:
      return state;
  }
}

export function GoogleProvider(props) {
 const [state, dispatch] = useReducer(GoogleReducer, initialState);

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
    <>
      <GoogleContext.Provider
        value={{ user: state.user, isAuth: state.isAuth, login, logout }}
        {...props}
      />
    </>
  )
}