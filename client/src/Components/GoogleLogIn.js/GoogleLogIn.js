import React, { useContext } from 'react' 
import Context from '../../context/auth'
import { GoogleLogin } from 'react-google-login'





export default function MyGoogleLogin(props) { 
  console.log(useContext(Context))
  // const { dispatch } = useContext(Context)
  const handleGoogleSuccess = async userData => {
    try {
        // const idToken = userData.getAuthResponse().id_token
 
        const validatedEmail = userData.profileObj.email
        console.log('google validated email:', validatedEmail)
        //console.log(localStorage.validatedEmail)
        //dispatch({ type: 'LOGIN_USER', payload: validatedEmail })
        // dispatch({ type: 'IS_LOGGED_IN', payload: googleUser.isSignedIn() })

        
        
        //
        // context.login(userData)
        // props.history.push('/')

    } catch (err) {
        handleGoogleFailure(err)
        }
}

  const handleGoogleFailure = err => console.error('Error logging in', err)

  
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
