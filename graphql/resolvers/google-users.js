const { AuthenticationError } = require('apollo-server')


// this checks there is a verified user on context. 
// If so, returns the resolver function it wrapped, otherwise throws an Error.
const authenticated = resolverFunc => (root, args, ctx, info) => {
  if (!ctx.user) {
    throw new AuthenticationError('Coming from google-users.js.... No ctx.googleUser....You must be logged in')
  }
  return resolverFunc(root, args, ctx, info)
}


module.exports = {
  Query: {
    user: authenticated((root, args, ctx) => {ctx.user}),
  }
}