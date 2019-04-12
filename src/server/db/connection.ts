/*import * as mongoose from 'mongoose';

export class DbConnection {

  constructor() {

  }

  public static startMongoDB(): boolean {
    let connection: boolean = false;

    mongoose.connect('mongodb://localhost/blog', function (err) {
      if (!err) { connection = true; } else { throw err; }
    });
    return connection;
  }
}
mongoose.connect('mongodb://localhost/blog', function (err) {
  if (err) { throw err; }
});*/

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Create a new MongoClient
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/admin', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function () {
  console.log("Connexion à la base OK");
});

export default db;