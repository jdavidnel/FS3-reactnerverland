'use strict';

var mongoose = require('mongoose');

var moviesSchema = mongoose.Schema({
	name: String,
	genre: String,
	rating: Number,
	explicit: Boolean
});

var movieModel = mongoose.model('Players', moviesSchema);
module.exports = movieModel;