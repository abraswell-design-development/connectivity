import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import { AuthContext } from '../../context/auth'
import { LOGIN_USER } from '../../graphql.js/mutations'
import { useForm } from '../../util/hooks'
import Form from '../../util/Form'

import './Login.css'
import MyGoogleLogIn from '../../Components/GoogleLogIn.js/GoogleLogIn';


export default function Login(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
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

  return (
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

        <MyGoogleLogIn/>
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
          <h3 className='login__form-title'>Login</h3>
          <Form onSubmit={onSubmit} className={loading ? 'Loading login--loading' : ''}>
            <label htmlFor="Username"> 
              <input
                className='login__form-group' 
                placeholder="Username.."
                name="username"
                type="text"
                value={values.username}
                error={errors.username ? true : false}
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
                error={errors.password ? true : false}
                onChange={onChange}
              />
            </label>
            <div className='Button--submit login__button'>
              <button type='submit'>
                Login 
              </button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  )
}
