require('dotenv').config()

const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { findOrCreateUser } = require('./controllers/google-user-controller')

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const MONGO_URI = process.env.MONGO_URI;
const pubsub = new PubSub();

// UNCOMMENT TO USE GraphQL PLAYGROUND!!!
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {req, pubsub} })

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: async ({ req }) => { 
//       if (!req.headers.authorization.split(`Bearer `)[1])  {
//          //Use Google
//         let googleToken = null
//         let user = null
//         try {
//           googleToken = req.headers.authorization
//           if (googleToken) {
//             // find Google User in db or create a new user
//             currentUser = await findOrCreateUser(googleToken)
//           }
//           console.log('Server.js No Bearer Token')
//         } catch (err) {
//           console.error(`Unable to authenticate user with token ${googleToken}`)
//         }
//         // attach found (or created) Google User to the context object
//         return { currentUser }
//       } else {
//         console.log('Server.js No Bearer Token')
//         //Use jwt
//         return {req, pubsub} 
//       }
//     }
//   })

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