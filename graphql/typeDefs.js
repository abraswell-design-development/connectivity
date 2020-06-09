const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String
    name: String
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    name: String
    username: String
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    name: String
    username: String
  }
  type User {
    id: ID!
    name: String,
    username: String,
    password: String,
    email: String,
    about: String,
    relation: String,
    city: String,
    state: String,
    picture: String,
    token: String,
    createdAt: String,
  }
  input RegisterInput {
    username: String!
    name: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUsers: [User]
    getUser(userId: ID!): User
    me: User
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;