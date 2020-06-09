const { AuthenticationError } = require('apollo-server')

const authenticated = next => (root, args, ctx, info) => {
// context (ctx) is passing us user from server.js
    if (!ctx.user) {
        throw new AuthenticationError('You must be logged in')
    }
    return next(root, args, ctx, info)
}

module.exports = {
    Query: {
        user: authenticated((root,args,ctx,info) => ctx.user)
    }
}