import { useState } from 'react'


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
        // const idToken = userData.getAuthResponse().id_token
 
        const validatedEmail = userData.profileObj.email

        //console.log(localStorage.validatedEmail)

        
        
        //
        // context.login(userData)
        // props.history.push('/')

    } catch (err) {
        handleGoogleFailure(err)
        }
}

export const handleGoogleFailure = err => console.error('Error logging in', err)


