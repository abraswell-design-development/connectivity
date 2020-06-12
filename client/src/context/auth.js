import React, { useContext, useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null
};

//////  COMMENTED OUT UNTIL GOOGLE ROUTE IS COMPLETE SO SITE DOESN'T BREAK ACCIDENTALLY ///////

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
// } else if (localStorage.getItem('googleToken')) {
//   const decodedToken = jwtDecode(localStorage.getItem('googleToken'));
//   if (decodedToken.exp * 1000 < Date.now()) {
//     localStorage.removeItem('googleToken');
//   } else {
//     initialState.user = decodedToken;
//   }
}


export const Context = createContext({
  user: null,
  googleUser: null,
  currentUser: null,
  isAuth: false,
  userEmail: null,
  login: (userData, googleUser) => {},
  logout: () => {}
});

export function ContextReducer(state, { type, payload}) {
  switch (type) {
    case 'LOGIN':
      console.log('ran LOGIN case')
      console.log ('payload contains: ', payload)
      return {
        ...state,
        user: payload
      }
      ;
    case 'LOGOUT':
      console.log('ran LOGOUT case')
      return {
        ...state,
        user: null
      };
      // case 'LOGIN_GOOGLE_USER':
      // console.log('ran LOGIN_GOOGLE_USER case')
      // return {
      //   ...state,
      //   user: payload,
      // }
    // case 'IS_GOOGLE_USER_LOGGED_IN':
    //   console.log('ran IS_GOOGLE_USER_LOGGED_IN case')
    //   return {
    //     ...state,
    //     isAuth: payload,
    //   }
    default:
      return state;
  }
}

export function ContextProvider(props) {
  const initialState = useContext(Context)
  const [state, dispatch] = useReducer(ContextReducer, initialState);
  console.log('auth.js state: ', state)

  function login(userData, currentUser) {
    localStorage.setItem('jwtToken', userData.token);
    console.log(localStorage)
    dispatch({
      type: 'LOGIN',
      payload: userData || currentUser
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  return (
      <Context.Provider
        value={{ user: state.user, currentUser: state.currentUser, googleUser: state.googleUser, isAuth: state.isAuth, login, logout }}
        {...props}
      />
  )
}

export default Context