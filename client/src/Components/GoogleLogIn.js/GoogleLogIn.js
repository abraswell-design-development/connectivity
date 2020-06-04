import React, { useContext } from 'react'
import { GraphQLClient } from 'graphql-request'
import { ME_QUERY } from '../../graphql.js/queries'

import { GoogleLogin } from 'react-google-login'
import GoogleContext from '../../context/auth'



const MyGoogleLogIn = () => {   
  console.log(useContext(GoogleContext));
  //const { dispatch } = useContext(GoogleContext)
  // console.log({dispatch})
  
  const handleSuccess = async googleUser => {
    try {
      // grab the successfully logged-in user's Google idToken
      const idToken = googleUser.getAuthResponse().id_token
      // create a GraphQL Client object, pass it the token as an auth header
      const client = new GraphQLClient('http://localhost:5000/graphql', {
        headers: {
          authorization: idToken,
        },
      })
      // query the server (server verifies token, finds or creates a User, returns user's info)
      const { me } = await client.request(ME_QUERY)
      // add the user's info to 'currentUser' field in state
      //dispatch({ type: 'LOGIN_GOOGLE_USER', payload: me })
      //dispatch({ type: 'IS_GOOGLE_USER_LOGGED_IN', payload: googleUser.isSignedIn() })
      console.log(`Google sign in worked`)
    } catch (err) {
      handleFailure(err)
    }
  }

  const handleFailure = err => console.error('Error logging in', err)
  // console.log('login failed')
  return ( 
      <GoogleLogin
        clientId="689809248438-g6ah561eahind4bjqm66u0d8sfl7jhon.apps.googleusercontent.com"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        //isSignedIn={true}
      />
  )
}


export default MyGoogleLogIn;
