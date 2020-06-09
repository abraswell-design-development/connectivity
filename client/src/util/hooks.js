import { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { GraphQLClient } from 'graphql-request'
import { ME_QUERY } from '../graphql/queries'
import { LOGIN_GOOGLE_USER } from '../graphql/mutations'


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
       // console.log("Google Token", idToken)
        localStorage.setItem('googleToken', idToken)
        // create a GraphQL Client object, pass it the token as an auth header
        const client = new GraphQLClient('http://localhost:5000/graphql', {
            headers: {
            authorization: idToken,
            },
        })
        const data = await client.request(ME_QUERY)
        const email = await data.me.email
        const id = await data.me.id
        const loggedInGoogleUser = { email, id }
        console.log('Google Login worked!')
        console.log("ME_QUERY returned:", loggedInGoogleUser)

        // const [logInGoogle] = useMutation(LOGIN_GOOGLE_USER, {
        //     update(proxy, result){
        //         console.log(result)
        //     },
        //     variables: {
        //         email: email,
        //         id: id
        //     }
        // })

    } catch (err) {
        handleGoogleFailure(err)
        }
}

