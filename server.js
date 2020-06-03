require('dotenv').config();

const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { findOrCreateUser } = require('./controllers/google-user-controller')

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers, 
  context: async ({ req }) => {
      let authToken = null
      let currentUser = null
      try {
          authToken = req.headers.authorization
          if (authToken) {
             currentUser = await findOrCreateUser(authToken) 
          } else {
            ({ req, pubsub })
          }
      }   catch(err) {
          console.error(`Unable to authentication user with token ${authToken}`)
      } 
      return { currentUser }
  }
})

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });