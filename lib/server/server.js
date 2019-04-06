"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';
import * as helmet from 'koa-helmet';*/
var Koa = require('koa');
var bodyParser = require('koa-bodyparser');
var Router = require('koa-router');
var helmet = require('koa-helmet');
var _a = require('apollo-server-koa'), graphqlKoa = _a.graphqlKoa, graphiqlKoa = _a.graphiqlKoa;
var schema = require('./src/server/db/graphql/middlewares');
var koa = new Koa();
koa.use(bodyParser({
    enableTypes: ['json', 'form', 'text'],
    extendTypes: {
        text: ['text/xml'],
    },
}));
koa.use(helmet());
var app = new Router();
app.post('/graphql', graphqlKoa({ schema: schema }));
app.get('/graphql', graphqlKoa({ schema: schema }));
app.get('/graphiql', graphiqlKoa({
    endpointURL: '/graphql',
}));
koa.use(app.routes());
koa.listen(3000);
console.log("App is running on port 3000");
console.log("You can contact the server on http://localhost:3000");
