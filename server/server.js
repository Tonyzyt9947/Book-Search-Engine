const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
// const routes = require('./routes');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

let apolloServer = null;
async function init(){
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({app});
}
init();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/public as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/public')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
})

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
