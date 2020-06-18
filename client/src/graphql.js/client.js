import { useState, useEffect } from 'react'
import { GraphQLClient } from 'graphql-request'

export const BASE_URL = 'http://localhost:5000/graphql'

export const useClient = () => {
  const [idToken, setIdToken] = useState('')

  useEffect(() => {
    setIdToken(
      // window.gapi.auth2
      //   .getAuthInstance()
      //   .user.get()
      //   .getAuthResponse().id_token
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImIxNmRlMWIyYWIwYzE2YWMwYWNmNjYyZWYwMWY3NTY3ZTU0NDI1MmEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNjg5ODA5MjQ4NDM4LWc2YWg1NjFlYWhpbmQ0YmpxbTY2dTBkOHNmbDdqaG9uLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNjg5ODA5MjQ4NDM4LWc2YWg1NjFlYWhpbmQ0YmpxbTY2dTBkOHNmbDdqaG9uLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEzNzY0OTczMjc1MjY5MzM5ODM0IiwiaGQiOiJhbXlicmFzd2VsbC5jb20iLCJlbWFpbCI6ImFteUBhbXlicmFzd2VsbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Im9jWmtubnRnUVc1VF84ZmRCSE1iN0EiLCJuYW1lIjoiQW15IEJyYXN3ZWxsIiwicGljdHVyZSI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tNWFNOVE2WjAxakkvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQU1adXVjbm1aVWUtUWJjOWZVbDZ4Y1BFQUd5VU5vVi1fUS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQW15IiwiZmFtaWx5X25hbWUiOiJCcmFzd2VsbCIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNTkyMzM0NTU3LCJleHAiOjE1OTIzMzgxNTcsImp0aSI6IjYwMjNhMmE5MTM3NjgwZDE2YzExZjk3MzA0NGNiOTA1ZGFkMmRkYzgifQ.AxqhNVrKuB35DgKCRiGXLLrSNmdyVJvgOgW4IFld6BB3CBUVbtI0nbWSlOM7yxxwHzN2SESH3JRWL1BHhXvPjn0Gh8P4U0QynH950R_g1wwU9WDDDViv0bTRnsEWUTuniTdcFqtJvChDm9eszRx0YLVJZdlxW3y7QieBJ_xiaWpTbjF6Gxk9Qn_8N4phJOcCZjquB6YKx6mvSM4B5EdxGNSjqjSniLd1jSJgV_1GnkFSJydKE0EQg3b2gnMKfukktjvR99JIJie3qnDo3ovMim1xejBeUE9ywQthm74iYwm4iLQ0MmwuTxfm_Ns_3KnYRoPBFFrrxBgCPsqrhBii0g'
    )
  }, [])

  return new GraphQLClient(BASE_URL, {
    headers: { authorization: idToken },
  })
}