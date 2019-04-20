# CLASH OF MEME
CLASH OF MEME - SERVER is the backend server for the clash of meme web site,
that allow you to be in competition with other user to get the best meme for a choosen theme.

## Getting Started
&nbsp;&nbsp;clone the repo:  
`git clone git@github.com:jdavidnel/FS3-reactnerverland-Server.git`  
&nbsp;&nbsp;run:   
`npm install`  
`npm start`  
&nbsp;&nbsp;See [endpoints](#Endpoits) next.

### Prerequisites
&nbsp;&nbsp;Check [Package.json](package.json)

#### Endpoints  
* #### api
  * `QUERY` [signup](#post-signup)  
  * `POST` [authentification](#get-login)
* #### Model
  * `QUERY` [model](#post-signup)  
  * `MUTATION` [addModel](#get-login)
  * `MUTATION` [updateModel](#get-login)
  * `MUTATION` [deleteModel](#get-login)

* #### Ingredient 
  * `GET` [ingredients](#get-ingredients)  
  * `GET` [ingredients/:subword](#get-ingredients/:subword)
* #### Dishes  
  * `GET` [dishes](#get-dishes)  
  * `GET` [dishes/:subword](#get-dishes/:subword)  

#### `QUERY` addPlayer  
&nbsp;&nbsp;Adds a new user to the user database.  
##### Parameters  
&nbsp;&nbsp;  - `login` `password` `mail`
##### Response  
&nbsp;&nbsp;A valid token `token`.

#### `QUERY` Model  
&nbsp;&nbsp; Get the player from graphql filters.  
##### Parameters  
&nbsp;&nbsp;  - filters from graphQL schema
##### Response  
&nbsp;&nbsp;A Model.


#### `MUTATION` addModel  
&nbsp;&nbsp;Adds a new model to the database.  
##### Parameters  
&nbsp;&nbsp;  - filters from graphQL schema
##### Response  
&nbsp;&nbsp; Model added.

#### `MUTATION` UpdateModel  
&nbsp;&nbsp;update the model to the database.  
##### Parameters  
&nbsp;&nbsp; `_id`
##### Response  
&nbsp;&nbsp; Model updated.

#### `MUTATION` deleteModel  
&nbsp;&nbsp;delete the model to the database.  
##### Parameters  
&nbsp;&nbsp; `_id`
##### Response  
&nbsp;&nbsp; Model deleted.

#### `POST` authentification  
&nbsp;&nbsp;Authentify the user 
##### Parameters  
&nbsp;&nbsp;  - `login` `password` `mail`
##### Response  
&nbsp;&nbsp;A valid token `token`

### Deployment
&nbsp;&nbsp;Clash-Of-Meme-Server is not yet deployed

### Built with
&nbsp;&nbsp;[Node.js](https://nodejs.org/en/)  
&nbsp;&nbsp;[apollo-server-express](https://koajs.com/)  
&nbsp;&nbsp;[GraphQL tool](https://koajs.com/)  
&nbsp;&nbsp;[Socket IO](https://koajs.com/)  

