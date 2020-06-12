import gql from 'graphql-tag';

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        name
        createdAt
        picture
        body
      }
      commentCount
    }
  }
`

export const LIKE_POST_MUTATION = gql`
mutation likePost($postId: ID!) {
  likePost(postId: $postId) {
    id
    likes {
      id
      username
      name
    }
    likeCount
  }
}
`

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      name
      picture
      likes {
        id
        username
        name
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        picture
        name
        createdAt
      }
      commentCount
    }
  }
`

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
    name
    about
    city
    state
    picture
    username
    relation
    createdAt
    token
  }
}
`

export const REGISTER_USER = gql`
mutation register(
  $name: String!
  $username: String!
  $email: String!
  $password: String!
  $confirmPassword: String!
) {
  register(
    registerInput: {
      name: $name
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    }
  ) {
    id
    email
    username
    name
    createdAt
    token
  }
}
`;

export const UPDATE_USER = gql`
mutation update(
  $about: String
  $city: String
  $state: String
  $picture: String
  $relation: String
) {
  update(
    updateInput: {
      about: $about
      city: $city
      state: $state
      picture: $picture
      relation: $relation
    }
  ) {
    id
    about
    city
    state
    picture
    relation
  }
}
`;

export const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
        picture
        name
      }
      commentCount
    }
  }
`;