import gql from 'graphql-tag';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
    name
    createdAt
    token
  }
}
`

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      name
      likeCount
      likes {
        username
        name
      }
      commentCount
      comments {
        id
        username
        name
        createdAt
        body
      }
    }
  }
`;

export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      name
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
    id
    name
    username
    about
    city
    state
    email
    picture
    token
    createdAt
    }
  }
`;

