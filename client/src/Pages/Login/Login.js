import React, { useContext, useState } from 'react'
import Context from '../../context/auth'
import { useMutation } from '@apollo/react-hooks'

import { GoogleLogin } from 'react-google-login'

import { LOGIN_USER } from '../../graphql.js/queries'
import { useForm } from '../../util/hooks'
import Form from '../../util/Form'

import './Login.css'


export default function Login(props) {

  const { dispatch } = useContext(Context)
  console.log('Login.js dispatch:', dispatch)


  // GOOGLE - APP ROUTE
  const handleGoogleSuccess = async userData => {
    try {
      const validatedEmail = userData.profileObj.email
      console.log('google validated email:', validatedEmail)
    // googleLogin(userData) 
      // add the user's info to 'currentUser' field in state
    //  dispatch({ type: 'LOGIN', payload: validatedEmail })
    // dispatch({ type: 'IS_GOOGLE_USER_LOGGED_IN', payload: userData.isSignedIn() })

      props.history.push('/')
    } catch (err) {
      handleGoogleFailure(err)
    }
  }

  const handleGoogleFailure = err => console.error('Error logging in', err)

  // JWT - APP ROUTE
  const context = useContext(Context)
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
          Jane seems to be doing good this week. She has been a good sport about participating in physical
          therapy twice a day. She is starting to feel a little more settled at Symphony and is slowly 
          starting to meet other residents.
        </p>

        <p> 
          She did mention that her sweet tooth is getting the best of her and she wished she had some
          puzzle books. If you are interested in doing something for her, she would love anything you
          might be able to send her way to brighten her day... she particularly likes Sudoku and candied
          orange slices.
        </p>

        <p>
          She mentioned that she really wished she could see Johnny graduate this week. If anyone is able
          to attend his celebration, would you please post a few pictures so she can share some of your joy?
        </p>

        <p>
          I will post a new update next Sunday so you will know how this week goes.
        </p>

        <p>
          Thank you for all that you do! Aunt Jane is really grateful and feels very loved!
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
              src={require(`../../Images/Patient_Photo.jpg`)} 
              alt='member headshot'
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
          <Form onSubmit={onSubmit} className={loading ? 'Loading login--loading' : ''}>
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
              buttonText="Google Login"
              theme="dark"
              //isSignedIn={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}