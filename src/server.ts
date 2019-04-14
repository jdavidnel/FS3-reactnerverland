const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
import { MiddlewaresGraphQL } from './server/db/graphql/middlewares';
import { Middleware } from 'koa-compose';
import * as socketio from "socket.io";
const jwt = require('jsonwebtoken');
import { IClash } from './types/Model/ClashModel';

let middlewares: MiddlewaresGraphQL = new MiddlewaresGraphQL();

const { typeDefs } = middlewares;
const { resolvers } = middlewares;

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

let io = require("socket.io").listen(app);
middlewares._io = io;

/*
var apiRoutes = app.Router();
// route middleware to verify a token
apiRoutes.use(function (req: any, res: any, next: any) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, middlewares._token, function (err: any, decoded: any) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});

	}
});
//app.use('/api', apiRoutes);
// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/clash/:clashID', async (req: any, res: any) => {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token != middlewares._token) {
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
	let clash: IClash[] = await middlewares._clashRepo.get({ _id: req.params.clashID, inprogress: true });
	if (clash.length == 0) {
		return res.status(403).send({
			success: false,
			message: 'Not authorized request.'
		});
	}


});
*/
io.sockets.on('connection', function (socket: any) {

	socket.on('UserConnected', async (userid: string) => {
		socket.pseudo = userid;
		let clashWorks: IClash[] = await middlewares._clashRepo.get({ inprogress: true });
		io.socket.emit('GetClashList', clashWorks);
	});
	console.log('Un client est connecté !');

});
// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


// Start the server
app.listen(3000, () => {
	console.log('Go to http://localhost:3000/graphiql to run queries!');
});