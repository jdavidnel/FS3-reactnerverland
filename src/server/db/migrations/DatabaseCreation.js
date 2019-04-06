var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/admin";

MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
	console.log("Database created!");
	db.createCollection("Player", function(err, res) {
		if (err) throw err;
		console.log("Collection Player created!");
	});
	db.createCollection("Clash", function(err, res) {
		if (err) throw err;
		console.log("Collection Clash created!");
	});
	db.createCollection("Vote", function(err, res) {
		if (err) throw err;
		console.log("Collection Vote created!");
	});
	db.createCollection("Meme", function(err, res) {
		if (err) throw err;
		console.log("Collection Meme created!");
	});
	db.createCollection("Round", function(err, res) {
		if (err) throw err;
		console.log("Collection Round created!");
	});
  	db.close();
});