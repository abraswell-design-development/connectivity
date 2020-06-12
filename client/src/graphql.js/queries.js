import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      name
      picture
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
        picture
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
      picture
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
        picture
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

export const ME_QUERY = `
{
  me {
    id
    name
    email
    picture
  }
}
`

