import { GraphQLClient } from 'graphql-request'



export const useClient = () => {
  const  idToken = localStorage.getItem('jwtToken')
  const BASE_URL = 'http://localhost:5000/graphql'
  return new GraphQLClient(BASE_URL, {
    headers: { authorization: idToken },
  })
}
