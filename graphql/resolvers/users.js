require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const {
  validateRegisterInput,
  validateLoginInput,
  validateUpdateInput
} = require('../../controllers/validators');
const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture
    },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  ); 
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find().sort({ name: 1 })
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          return user;
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async login(_, {email, password }) {
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ email });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },

    async register(
      _,
      {
        registerInput: { name, email, password, confirmPassword }
      }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        name,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError('Email is already registered', {
          errors: {
            email: 'This email is already registered'
          }
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        name,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },

    async updateProfile(_, {email, phone, city, state, about, relation}) {

      const user = await User.findOne({ email });
      if (!user) {
        throw new UserInputError('Cannot find user in database', {
          errors: {
            email: 'Cannot find user with that email'
          }
        });
      }
      user.phone = phone
      user.city = city
      user.state = state
      user.about = about
      user.relation = relation
      return user
    }

    // async updateProfile(
    //   _,
    //   {
    //     updateInput: { 
    //       email, 
    //       password, 
    //       confirmPassword, 
    //       phone, 
    //       city, 
    //       state, 
    //       picture, 
    //       banner, 
    //       about, 
    //       relation
    //     }
    //   }

    // ) {

    //   // Validate user data
    //   const { valid, errors } = validateUpdateInput(
    //     password,
    //     confirmPassword
    //   );
    //   if (!valid) {
    //     throw new UserInputError('Errors', { errors });
    //   }
    //   const user = await User.findOne({ email });
    //   if (!user) {
    //     throw new UserInputError('Cannot find user in database', {
    //       errors: {
    //         email: 'Cannot find user in database'
    //       }
    //     });
    //   }
    //   // hash password and create an auth token
    //   password = await bcrypt.hash(password, 12);

    //   const updatedUser = User({
    //     phone, 
    //     city,
    //     state, 
    //     picture, 
    //     banner, 
    //     about,
    //     relation
    //   });

    //   const res = await updatedUser.save();

    //   const token = generateToken(res);
    //   console.log('user profile updated!')
    //   return {
    //     ...res._doc,
    //     id: res._id,
    //     token
    //   };
    // }
  }
};