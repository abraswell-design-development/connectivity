require('dotenv').config()

const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { findOrCreateUser } = require('./controllers/google-user-controller')

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const MONGO_URI = process.env.MONGO_URI;
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
  // context: async ({ req }) => {
  //   let authToken = null
  //   let currentUser = null
  //   try {
  //     authToken = req.headers.authorization
  //     if (user) {
  //       ({ req, pubsub })
  //       console.log('jwt sign in')
  //     }
      // } else {
      //   // find user in db or create a new one
      //   currentUser = await findOrCreateUser(authToken)
      //   console.log('google sign in')
      // }
    // } catch (err) {
    //   // console.error(`Unable to authenticate user with token ${authToken}`)
    //   console.log('Login not working')
    // }
    // attach found (or created) user to the context object
    // return { currentUser }
  })


mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
   })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });