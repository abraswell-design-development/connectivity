const { gql } = require('apollo-server');

module.exports = gql`
  type Comment {
    id: ID!
    createdAt: String!
    name: String
    username: String
    picture: String
    body: String!
  }
  type Folder {
    id: ID!
    name: String!
    createdAt: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    name: String
    username: String
  }
  type Photo {
    id: ID!
    image: String!
    createdAt: String!
    folder: [Folder]!
  }
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String
    name: String
    picture: String
    relation: String
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type User {
    id: ID!
    name: String
    username: String
    password: String
    email: String
    about: String
    relation: String
    picture: String
    city: String
    state: String
    token: String
    createdAt: String
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateProfile(about: String, city: String, state: String, picture: String, relation: String): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    createPhoto(photoId: ID!, image: String!): Photo
    deletePhoto(photoId: ID!): Photo!
  }
  type Query {
    getPhotos: [Photo]
    getPhoto(photoId: ID!): Photo
    getFolders: [Folder]
    getFolder(folderId: ID!): Folder
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUsers: [User]
    getUser(userId: ID!): User
    me: User
  }
  type Subscription {
    newPost: Post!
  }
  input RegisterInput {
    username: String!
    name: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input UpdateProfileInput {
    name: String!
    username: String!
    email: String!
    about: String
    relation: String
    picture: String
    city: String
    state: String
  }
`



