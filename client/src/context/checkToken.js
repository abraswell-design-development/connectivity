import jwtDecode from 'jwt-decode';
import { GraphQLClient } from 'graphql-request'
import { GOOGLE_USER_QUERY } from '../graphql.js/queries'

const initialState = {
    user: null
  };

// checkToken()

async function checkToken() {
    if (localStorage.getItem('jwtToken')) {
      const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
      } else {
        try{
          const idToken = localStorage.getItem('jwtToken')
          checkToken(idToken)
          const client = new GraphQLClient('http://localhost:5000/graphql', {
          headers: {
            authorization: idToken,
          }, 
        })
        // query the server (server verifies token, finds or creates a User, returns user's info)
          let returnedUser = await client.request(GOOGLE_USER_QUERY)
          console.log(returnedUser)
          let user = await returnedUser.user
  
          let normalizedUser = {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            city: user.city,
            state: user.state, 
            about: user.about,
            relation: user.relation, 
            picture: user.picture,
            banner: user.banner
          };
          console.log('normalizedUser: ', normalizedUser)
          initialState.user= normalizedUser 
          console.log('initialState.user: ', initialState.user )
        }
        catch {
          console.log('user is decoded token...')
          initialState.user = decodedToken;
          }
        } 
    }
}

export {initialState}