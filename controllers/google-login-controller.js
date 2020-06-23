const { OAuth2Client } = require('google-auth-library')
const User = require('../models/User')

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)



const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID,
    })
    const googleUser = new User({
      email: ticket.payload.email, 
      name: ticket.payload.name,
      picture: ticket.payload.picture
    });
    const user = {
      id: (googleUser._id).toString(),
      email: googleUser.email, 
      name: googleUser.name,
      picture: googleUser.picture
    };
    return user
  } catch (err) {
    console.error('Error verifying auth token', err)
  }
}

const checkIfUserExists = async email => {
  return User.findOne({ email }).exec()
}

exports.findOrCreateUser = async token => {
  // verify auth token
  const googleUser = await verifyAuthToken(token)
  // check if User exists
  let user = await checkIfUserExists(googleUser.email)
  // if user exists, return them, otherwise create new User
  return {    
    ...user._doc,
    id: user._id,
    token 
  }
  || 
  createNewUser(googleUser)
}

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser
  const user = { name, email, picture }
  return new User(user).save()
}



