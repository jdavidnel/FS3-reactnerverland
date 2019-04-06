'use strict';

var mongo = require('../connection');
var assert = require('assert');
var movieModel = require('../../../types/Model/Movies');
var playerModel = require('../../../types/Model/PlayerModel');

function getAuthors(filters) {
    console.log("getAUthors");
}

function addAuthor(filters) {
    console.log("addAuthors");
}

function updateAuthor(iddelete) {
    console.log("deleteAuthors");
}

function deleteAuthor(iddelete) {
    console.log("deleteAuthors");
}

function getComments(filters) {
    var commentlist = [];

    debugger;
    mongo.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var db = mongo.db('local');
        var collection = db.collection('comments');
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records for comments request");
            commentlist.push(docs);
            console.log(docs);
            //callback(docs);
        });
        mongo.close();
    });
    return commentlist;
}

function getMovies(filters) {
    var movieslist = new Array();

    movieModel.find({}, function (err, piscines) {
        if (err) {
            console.log("error ");
            console.log(err);
        }
        movieslist.push(piscines);
        console.log("FIND!");
        console.log(movieslist);
    });
    return movieslist;

    /*
    console.log("AFFICHAGE TABLEAU AVANT INSERTION");
    console.log(movieslist);
    mongo.connect(function(err) {
        assert.equal(null, err);
        const db = mongo.db('local');
        let test = new Array();
         const collection = db.collection('movies');
        var callback = () => { }
        var resulttest = collection.find({}).toArray(function(err, docs, movieslist) {
            assert.equal(err, null);
            //callback(docs);
        });
        mongo.close();
        console.log("Result close");
        console.log(resulttest);
    });
    return movieslist;
    */
}

function addMovie(movie) {
    mongo.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var db = mongo.db('local');
        var collection = db.collection('movies');
        collection.insertMany([movie], function (err, result) {
            assert.equal(err, null);

            //assert.equal(3, result.result.n);
            //assert.equal(3, result.ops.length);
            console.log("Inserted Movies into the collection ");
        });
        mongo.close();
    });
    return movie;
}

function addComment(comment) {

    mongo.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var db = mongo.db('local');
        var collection = db.collection('comments');
        collection.insertMany([comment], function (err, result) {
            assert.equal(err, null);
            //assert.equal(3, result.result.n);
            //assert.equal(3, result.ops.length);
            console.log("Inserted Comment into the collection");
        });
        mongo.close();
    });
    return comment;
}

function updateMovie(movie) {
    var tmpMovie = {};

    if (movie.name) tmpMovie.name = movie.name;
    if (movie.genre) tmpMovie.genre = movie.genre;
    if (movie.rating) tmpMovie.rating = movie.rating;
    if (movie.explicit) tmpMovie.explicit = movie.explicit;
    if (movie.comments) tmpMovie.comments = movie.comments;

    mongo.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var db = mongo.db('local');
        var collection = db.collection('movies');

        collection.updateOne({ movie_id: movie.movie_id }, { $set: { tmpMovie: tmpMovie } }, function (err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field a equal to 2");
        });
        mongo.close();
    });
    return movie;
}

function updateComment(comment) {
    var tmpComment = {};

    if (comment.content) tmpComment.content = comment.content;
    if (comment.author) tmpComment.author = comment.author;

    mongo.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var db = mongo.db('local');
        var collection = db.collection('comments');

        collection.updateOne({ comment_id: comment.comment_id }, { $set: { tmpComment: tmpComment } }, function (err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field a equal to 2");
        });
        mongo.close();
    });
    return comment;
}

function deleteMovie(movieId) {
    mongo.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var db = mongo.db('local');
        var collection = db.collection('movies');

        collection.deleteOne({ movie_id: movieId.movie_id }, function (err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Removed the document with the field a equal to 3");
        });
        mongo.close();
    });
    return movieId;
}

function deleteComment(commentId) {

    mongo.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        var db = mongo.db('local');
        var collection = db.collection('comments');

        collection.deleteOne({ comment_id: commentId.comment_id }, function (err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Removed the document with the field a equal to 3");
        });
        mongo.close();
    });
    return commentId;
}

module.exports = {
    getAuthors: getAuthors,
    getComments: getComments,
    getMovies: getMovies,
    addMovie: addMovie,
    addComment: addComment,
    addAuthor: addAuthor,
    updateMovie: updateMovie,
    updateComment: updateComment,
    updateAuthor: updateAuthor,
    deleteMovie: deleteMovie,
    deleteComment: deleteComment,
    deleteAuthor: deleteAuthor
};