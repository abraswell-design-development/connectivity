require('dotenv').config()

const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { findOrCreateUser } = require('./controllers/google-user-controller')

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const MONGO_URI = process.env.MONGO_URI;
const pubsub = new PubSub();

//(Google) authToken = req.headers.authorization
// (defined at Line28 of this file, server.js)

// (jwt) const authHeader = context.req.headers.authorization; 
// (defined in jwt-user-controller.js Line 9)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
})
  // context: async ({ req }) => {
  //   let authToken = null
  //   let currentUser = null
  //   try {
  //     authToken = req.headers.authorization
  //     if (authToken) {
  //       // find user in db or create a new one
  //       currentUser = await findOrCreateUser(authToken)
  //     }
  //   } catch (err) {
  //     console.error(`Unable to authenticate user with token ${authToken}`)
  //   }
  //   // attach found (or created) user to the context object
  //   return { currentUser }
  // }
  // })


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