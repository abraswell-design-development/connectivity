export function ContextReducer(state, { type, payload}) {
    switch (type) {
      case "CREATE_PHOTO":
        console.log('CREATE_PHOTO_CASE has run... payload is: ', payload)
        console.log('updated state is: ', state)
        return {
          ...state,
          newPicture: payload
        };
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