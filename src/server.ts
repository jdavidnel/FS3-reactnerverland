const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

//const schemaTypedef = require('./server/db/graphql/middlewares');
const { typeDefs } = require('./server/db/graphql/middlewares');
const { resolvers } = require('./server/db/graphql/middlewares');

// Some fake data
/*
const books = [
	{
		title: "Harry Potter and the Sorcerer's stone",
		author: 'J.K. Rowling',
	},
	{
		title: 'Jurassic Park',
		author: 'Michael Crichton',
	},
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

// The resolvers
const resolvers = {
	Query: { books: () => books },
};

*/

// Put together a schema
//console.log(schemaTypedef);
console.log("Schema BDD REEL");
console.log("TypeDefs");
console.log(typeDefs);
console.log("resolvers");
console.log(resolvers);
debugger;
const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
//const schema = makeExecutableSchema(schemaTypedef);

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
	console.log('Go to http://localhost:3000/graphiql to run queries!');
});