'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var _require = require('apollo-server-express'),
    graphqlExpress = _require.graphqlExpress,
    graphiqlExpress = _require.graphiqlExpress;

var _require2 = require('graphql-tools'),
    makeExecutableSchema = _require2.makeExecutableSchema;

var schemaTypedef = require('./server/db/graphql/middlewares');

// Some fake data
var _books = [{
  title: "Harry Potter and the Sorcerer's stone",
  author: 'J.K. Rowling'
}, {
  title: 'Jurassic Park',
  author: 'Michael Crichton'
}];

// The GraphQL schema in string form
var typeDefs = '\n  type Query { books: [Book] }\n  type Book { title: String, author: String }\n';

// The resolvers
var resolvers = {
  Query: { books: function books() {
      return _books;
    } }
};

// Put together a schema
console.log(schemaTypedef);
debugger;
var schema = makeExecutableSchema(schemaTypedef);

// Initialize the app
var app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, function () {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});