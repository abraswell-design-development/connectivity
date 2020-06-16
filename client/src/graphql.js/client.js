import { useState, useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'

export const BASE_URL = 'http://localhost:5000/graphql'

export const useClient = () => {
  const [idToken, setIdToken] = useState('')

  useEffect(() => {
    setIdToken(
      window.gapi.auth2
        .getAuthInstance()
        .user.get()
        .getAuthResponse().id_token
    )
  }, [])

  return new GraphQLClient(BASE_URL, {
    headers: { authorization: idToken },
  })
}