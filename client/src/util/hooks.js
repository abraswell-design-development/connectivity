import { useState } from 'react'
import { GraphQLClient } from 'graphql-request'
import { ME_QUERY } from '../graphql/queries'


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


export const handleGoogleFailure = err => console.error('Error logging in', err)


export const handleGoogleSuccess = async userData => {
    try {
        const idToken = userData.getAuthResponse().id_token
        localStorage.setItem('googleToken', idToken)
        // create a GraphQL Client object, pass it the token as an auth header
        const client = new GraphQLClient('http://localhost:5000/graphql', {
            headers: {
            authorization: idToken,
            },
        })
        const data = await client.request(ME_QUERY)
        console.log({ data })
        const email = await data.me.email
        const id = await data.me.id
        const loggedInGoogleUser = { email, id }
        console.log(loggedInGoogleUser)
    } catch (err) {
        handleGoogleFailure(err)
        }
}




