const { AuthenticationError } = require('apollo-server')

//* a Higher-Order-Function that will wrap all resolver functions. Checks there is a verified user on context. 
// If so, returns the resolver function it wrapped, otherwise throws an Error.

const authenticated = resolverFunc => (root, args, ctx, info) => {
  if (!ctx.currentUser) {
    throw new AuthenticationError('You must be logged in')
  }
  return resolverFunc(root, args, ctx, info)
}


module.exports = {
    Query: {
        me: authenticated((root, args, ctx) => ctx.currentUser),
        getPhotos: async (root, args, { Photo }) => {
          return Photo.find({})
            .populate('author')
        },
    },
    Mutation: {
        createPhoto: authenticated(async (root, { input }, { currentUser, Photo }) => {
          const newPhoto = await new Photo({
            ...input,
            author: currentUser._id,
          }).save()
    
          return Photo.populate(newPhoto, 'author')
        }),
        deletePhoto: authenticated(async (root, { photoId }, { currentUser, Photo }) => {
          return Photo.findOneAndDelete({
            _id: photoId,
            author: currentUser._id,
          })
        }),      
    },
}