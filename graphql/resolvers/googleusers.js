const { AuthenticationError } = require('apollo-server')

const user = {
    id: '3',
    name: 'Todays USER',
    email: 'amy@googleuser.com',
    picture: 'https://cloudinary.com'
}



const authenticated = next => (root, args, ctx, info) => {
// context (ctx) is passing us currentUser from server.js
    if (!ctx.currentUser) {
        throw new AuthenticationError('You must be logged in')
    }
    return next(root, args, ctx, info)
}

module.exports = {
    Query: {
        me: authenticated((root,args,ctx,info) => ctx.currentUser)
    }
}
