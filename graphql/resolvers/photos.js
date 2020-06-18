const { AuthenticationError, UserInputError } = require('apollo-server');

const Photo = require('../../models/Photo');
const Folder = require('../../models/Folder')
const checkAuth = require('../../controllers/user-middleware-controller');

module.exports = {
  Query: {
    async getPhotos() {
      try {
        const photos = await Photo.find().sort({ createdAt: -1 });
        return photos;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPhoto(_, { photoId }) {
      try {
        const photo = await Photo.findById(photoId);
        if (photo) {
          return photo;
        } else {
          throw new Error('Photo not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getFolders() {
      try {
        const folders = await Folder.find().sort({ createdAt: -1 });
        return folders;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getFolder(_, { folderId }) {
      try {
        const folder = await Folder.findById(folderId);
        if (folder) {
          return folder;
        } else {
          throw new Error('Photo not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPhoto(_, { image }, context) {

      if (image.trim() === '') {
        throw new Error('Photo body must not be empty');
      }

      const newPhoto = new Photo({
        image,
        createdAt: new Date().toISOString()
      });

      const photo = await newPhoto.save();

      context.pubsub.publish('NEW_PHOTO', {
        newPhoto: photo
      });

      return photo;
    },
    // async deletePhoto(_, { photoId }, context) {
    //   const user = checkAuth(context);

    //   try {
    //     const photo = await Photo.findById(photoId);
    //     if (user.name === photo.name) {
    //       await photo.delete();
    //       return 'Photo deleted successfully';
    //     } else {
    //       throw new AuthenticationError('Action not allowed');
    //     }
    //   } catch (err) {
    //     throw new Error(err);
    //   }
    // },
    
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
    }
  }
};