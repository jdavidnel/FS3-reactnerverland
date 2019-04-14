const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
import { MiddlewaresGraphQL } from './server/db/graphql/middlewares';
import * as socketio from "socket.io";
const jwt = require('jsonwebtoken');
import { IClash } from './types/Model/ClashModel';

let middlewares: MiddlewaresGraphQL = new MiddlewaresGraphQL();

const { typeDefs } = middlewares;
const { resolvers } = middlewares;
const schema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });

console.log("Schema BDD REEL");
console.log("TypeDefs");
console.log(typeDefs);
console.log("resolvers");
console.log(resolvers);
const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
var apiRoutes = express.Router();
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);
middlewares._io = io;
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use('/api/clash/:clashID', async (req: any, res: any) => {
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
	io.on("", function (socket: any) {
		console.log("a user connected");
		// whenever we receive a 'message' we log it out
		socket.on("UserConnected", function (message: any) {
			socket.userid = message;
		});
	});
});
app.set('superSecret', "secretKey");

apiRoutes.use(function (req: any, res: any, next: any) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function (err: any, decoded: any) {
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded; next();
			}
		});

	} else {
		// if there is no token
		// return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});

	}
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", (socket: any) => {
	console.log("a user connected");
	// whenever we receive a 'message' we log it out
	socket.on("UserConnected", (message: any) => {
		console.log("old USERID = " + socket.userid);
		socket.userid = message;
		console.log("new USERID = " + message);
		middlewares._io = socket;
	});
});

const server = http.listen(3000, function () {
	console.log("listening on *:3000");
});