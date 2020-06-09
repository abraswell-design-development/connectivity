import React, { useContext, useState } from 'react'
import Context from '../../context/auth'
import { useMutation } from '@apollo/react-hooks'

import { GoogleLogin } from 'react-google-login'
import { LOGIN_GOOGLE_USER } from '../../graphql.js/mutations'


export default function MyGoogleLogin(props) {

    const { dispatch } = useContext(Context)
    console.log('Login.js dispatch:', dispatch)
    const context = useContext(Context)
    const [setErrors] = useState({})


// GOOGLE LOGIN ROUTE
  const handleGoogleSuccess = async userData => {
    try {
      const validatedEmail = userData.profileObj.email
      console.log('email validated by Google: ', validatedEmail)
      loginGoogleUser(validatedEmail)
    } catch (err) {
      handleGoogleFailure(err)
    }
  }

  const handleGoogleFailure = err => console.error('Error logging in', err)
  
  const [loginGoogleUser, { loading }] = useMutation(LOGIN_GOOGLE_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      console.log("userData: ", userData)
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
     setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {email: validatedEmail}
  })



  return  (

    <div className='google-button'>
        <GoogleLogin
            type="submit"
            clientId="689809248438-g6ah561eahind4bjqm66u0d8sfl7jhon.apps.googleusercontent.com"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            buttonText="Google Login"
            theme="dark"
            //isSignedIn={true}
        />
    </div>

  )

}

  


