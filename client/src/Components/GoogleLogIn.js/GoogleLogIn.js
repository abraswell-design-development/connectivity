import React from 'react'
import { GoogleLogin } from 'react-google-login'

import { handleGoogleSuccess, handleGoogleFailure } from '../../util/hooks'



export default function MyGoogleLogin(props) {   
  return ( 
      <GoogleLogin
        clientId="689809248438-g6ah561eahind4bjqm66u0d8sfl7jhon.apps.googleusercontent.com"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
        buttonText="Google Login"
        theme="dark"
        //isSignedIn={true}
      />
  )
}



