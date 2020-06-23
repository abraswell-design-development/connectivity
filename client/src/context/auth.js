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
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    case 'UPDATE_USER':
      console.log('updateUser case called in switch statement')
      console.log('payload contains: ', payload)
      return {
        ...state,
        user: payload
      }
      ;
    case "CREATE_PHOTO":
      const newPhoto = payload;
      const prevPhotos = state.photos.filter(photo => photo._id !== newPhoto._id);
      return {
        ...state,
        photos: [...prevPhotos, newPhoto]
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

  function updateUser(userData) {
    console.log('updateUser function called')
    dispatch({
      type: 'UPDATE_USER',
      payload: userData
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }


  return (
    <AuthContext.Provider
    value={{ user: state.user,  pins: state.pins, photos: state.photos, googleUser: state.googleUser, isAuth: state.isAuth, login, logout, updateUser }}
    {...props}
    />
  );
}

export { AuthContext, AuthProvider };