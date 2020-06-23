const { gql } = require('apollo-server');

module.exports = gql`
  type Comment {
    id: ID!
    createdAt: String!
    name: String
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
    name: String
    picture: String
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type User {
    id: ID!
    name: String
    password: String
    email: String
    phone: String
    about: String
    relation: String
    picture: String
    banner: String
    city: String
    state: String
    token: String
    createdAt: String
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateProfile(email: String!, phone: String, city: String, state: String, about: String, relation: String ): User!
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
    name: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
`






