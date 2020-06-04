import React from "react";
import { GraphQLClient } from 'graphql-request'
import { GoogleLogin } from 'react-google-login'


const ME_QUERY = `
{
  me {
    id
    name
    email
    picture
  }
}
`

const MyGoogleLogIn = ({ classes }) => {


  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token
    const client = new GraphQLClient('http://localhost:5000/graphql', {
      headers: { authorization: idToken}
    })
    const data = await client.request(ME_QUERY)
      console.log({ data })
  }


  return <GoogleLogin 
  clientId='689809248438-g6ah561eahind4bjqm66u0d8sfl7jhon.apps.googleusercontent.com' 
  onSuccess={onSuccess}
  //isSignedIn={true}
  />
};



export default MyGoogleLogIn;
