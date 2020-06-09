import { useState } from 'react'
//import { GraphQLClient } from 'graphql-request'


export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)
       
    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
      }

    const onSubmit = event => {
        event.preventDefault()
        callback()
    }
    return {
        onChange,
        onSubmit,
        values
    } 
}

export const handleGoogleSuccess = async userData => {

    try {
        const idToken = userData.getAuthResponse().id_token
 
        console.log(userData)
        // create a GraphQL Client object, pass it the token as an auth header
        // new GraphQLClient('http://localhost:5000/graphql', {
        //     headers: {
        //     authorization: idToken,
        //     },
        // })
        // put the token in local storage for dispatch in auth.js
        localStorage.setItem('googleToken', idToken)

        //
        // context.login(userData)
        // props.history.push('/')

        console.log(idToken)
    } catch (err) {
        handleGoogleFailure(err)
        }
}

export const handleGoogleFailure = err => console.error('Error logging in', err)


