const { OAuth2Client } = require('google-auth-library')
const User = require('../models/User')

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

// THIS IS FROM USER-MIDDLEWARE-CONTROLLER.JS
// AND PROVIDES THE TOKEN NEEDED TO ALLOW USER THE
// ABILITY TO CREATE COMMENTS / LIKES / POSTS / PHOTOS, ETC...
// WHERE CAN I PUT THIS SO GOOGLE USER IS VALIDATED? 
module.exports = (context) => {
  const authHeader = context.req.headers.authorization;  
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};


const verifyAuthToken = async token => {
  console.log('verifying Auth token in database...')
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID,
    })
    return ticket.getPayload()
  } catch (err) {
    console.error('Error verifying auth token', err)
  }
}

const checkIfUserExists = async email => {
  return User.findOne({ email }).exec()
}

const createNewUser = googleUser => {
  console.log('createNewUser triggered...')
  const { name, email, picture } = googleUser
  const user = { name, email, picture }
  return new User(user).save()
}

exports.findOrCreateUser = async token => {
  console.log('Looking for Google user in database....')
  // verify auth token
  const googleUser = await verifyAuthToken(token)
  // check if User exists
  let user = await checkIfUserExists(googleUser.email)
  console.log('Google User Found in database!')
  console.log('Token from google-user-controller: ', token)
  // if user exists, return them, otherwise create new User
  return {    
    ...user._doc,
    id: user._id,
    token 
  }
  || 
  createNewUser(googleUser)
}



