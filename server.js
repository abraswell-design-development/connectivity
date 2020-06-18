require('dotenv').config()

const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { findOrCreateUser } = require('./controllers/google-user-controller')

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const MONGO_URI = process.env.MONGO_URI;
const pubsub = new PubSub();

// UNCOMMENT TO USE GraphQL PLAYGROUND!!!
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => {req, pubsub} })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => { 
      if (!req.headers.authorization.split(`Bearer `)[1])  {
        //Use Google
        let authToken = null
        let user = null
        try {
          authToken = req.headers.authorization
          // console.log('authToken received from request header')
          if (authToken) {
            // find Google User in db or create a new user
            // and update user in CONTEXT to pass on to google-user.js
            user = await findOrCreateUser(authToken) 
            // console.log('authToken: ', authToken)
          }
        } 
        catch (err) {
          console.error(`Unable to authenticate user with token`)
        }
        // console.log('Google User returned from server.js: ', user)
        // attach found (or created) Google User to the context object
        return { user }
      } else {
        //Use jwt
        return {req, pubsub} 
      }
    }
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