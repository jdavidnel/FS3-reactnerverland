const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Create a new MongoClient
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/admin', {useNewUrlParser: true});

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    console.log("Connexion à la base OK"); 
}); 

module.exports = db;