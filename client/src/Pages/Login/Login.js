import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { GoogleLogin } from 'react-google-login'
import { GraphQLClient } from 'graphql-request'

import {AuthContext} from '../../context/auth'
import Form from '../../util/Form'
import { LOGIN_USER } from '../../graphql/mutations'
import { GOOGLE_USER_QUERY } from '../../graphql/queries'
import { useForm } from '../../util/hooks'

import './Login.css'


export default function Login(props) {
  const context = useContext(AuthContext)
  const {dispatch} = useContext(AuthContext)

// // GOOGLE ROUTE
// This route gets the .id_token from the returned Google object and verifies the token in
// the verifyAuthToken method (google-login-controller.js Lines 8 - 29) to create
// the variable googleUser. This googleUser object is passed to this function once available 
// (from the server) to make a query call to get the user's data from the database which is 
// then normalized to match the object shape of the user who signed in through the app. 
// Finally, the normalized user object is made available throughout the app using the 
// ContextReducer case 'SET_USER_DATA' (auth.js Lines 85 - 88) and calling the setUserData() method
// (auth.js Lines 113 - 118) through dispatch.

  const handleGoogleSuccess = async googleUser => {
    try {
    // grab the successfully logged-in user's Google idToken
      const idToken = googleUser.getAuthResponse().id_token
      localStorage.setItem('jwtToken', idToken)
      // create a GraphQL Client object, pass it the token as an auth header
      const client = new GraphQLClient('http://localhost:5000/graphql', {
        headers: {
          authorization: idToken,
        }, 
      })
      // query the server (server verifies token, finds or creates a User, returns user's info)
      let returnedUser = await client.request(GOOGLE_USER_QUERY)

      // request is intercepted by server.js here to pass authToken to server through context
      // when user has gone through the controller, returnedUser is passed back to login 
      // process through context
      let user = await returnedUser.user
      // normalize returnedUser to object shape of users who signed in through the app using JWT.
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

      dispatch({ type: 'SET_USER_DATA', payload: normalizedUser })

      props.history.push('/')
  } catch (err) {
    handleGoogleFailure(err)
    }
  }

  const handleGoogleFailure = err => console.error('Error logging in', err)

  
  // JWT - APP ROUTE
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  })

  function loginUserCallback() {
    loginUser()
  }
  

  return  (
    <section className='login-main'>
      <div className='login__title'>          
        <h2>Welcome Back!</h2>
      </div>
      <div className='login__statement'>
        <p>
          Charles seems to be doing good this week. He has been a good sport about participating in physical
          therapy twice a day. He is starting to feel a little more settled at Symphony and is slowly 
          starting to meet other residents.
        </p>

        <p> 
          He did mention that his sweet tooth is getting the best of him and he wished he had some
          puzzle books. If you are interested in doing something for him, he would love anything you
          might be able to send his way to brighten his day... he particularly likes Sudoku and candied
          orange slices.
        </p>

        <p>
          I will post a new update next Sunday so you will know how this week goes.
        </p>

        <p>
          Thank you for all that you do! Charles is really grateful and feels very loved!
        </p>

        <p>
          Best wishes,
          <br></br>
          Susie
        </p>
      </div>

      <div className='login__flex-container'>
        <div className='login__img-container'>
          <img 
              src='https://res.cloudinary.com/connectivity/image/upload/c_scale,w_1000/v1592862388/Charles_95th_BDay-15_copy_n5tdhl.jpg'
              alt='patient headshot'
          >
          </img>    
        </div>

        <div className='login__info-container'>
          {Object.keys(errors).length > 0 && (
            <div className="Error Message">
              <ul className="Error__list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
          <h3 className='login__form-title'>Login:</h3>
          <Form onSubmit={onSubmit} className={loading ? 'loading-login' : ''}>
            <label htmlFor="Email"> 
              <input
                className='login__form-group' 
                placeholder="Email..."
                name="email"
                type="text"
                value={values.email}
                error={errors.email ? 'true' : 'false'}
                onChange={onChange}
              />
            </label>
            <label htmlFor="Password">
              <input
                className='login__form-group'
                placeholder="Password.."
                name="password"
                type="password"
                value={values.password}
                error={errors.password ? 'true' : 'false'}
                onChange={onChange}
              />
            </label>
            <div className='Button--submit login__button'>
              <button type='submit'>
                Login 
              </button>
            </div>
          </Form>
          <h3 className='login__form-title'>Or through Google:</h3>
          <div className='google-button'>
            <GoogleLogin
              clientId="689809248438-g6ah561eahind4bjqm66u0d8sfl7jhon.apps.googleusercontent.com"
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              buttonText="Login"
              theme="dark"
            />
          </div>
        </div>
      </div>
    </section>
  )
}