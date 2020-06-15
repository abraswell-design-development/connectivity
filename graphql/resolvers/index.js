const photosResolvers = require('./photos')
const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const googleUsersResolvers = require('./google-users');
const commentsResolvers = require('./comments');

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },
  Query: {
    ...googleUsersResolvers.Query,
    ...photosResolvers.Query,
    ...postsResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...commentsResolvers.Mutation,
    ...photosResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription
  }
};