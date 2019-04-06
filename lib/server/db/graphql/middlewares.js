'use strict';

var _resolvers;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('fs'),
    readFileSync = _require.readFileSync;

var _require2 = require('graphql-tools'),
    makeExecutableSchema = _require2.makeExecutableSchema;

var queries = require('../queries/queries');
var clashRepository = require('../queries/ClashRepository');
var voteRepository = require('../queries/VoteRepository');
var memeRepository = require('../queries/MemeRepository');
var roundRepository = require('../queries/RoundRepository');
var playerRepository = require('../queries/PlayerRepository');

var schema = {
  typeDefs: readFileSync('src/server/db/graphql/schemas.graphql', 'utf8'),
  resolvers: (_resolvers = {
    // Prototypes des fonctions GET
    Query: {
      authors: function authors(_, filters) {
        return queries.getAuthors(filters);
      },
      comments: function comments(_, filters) {
        return queries.getComments(filters);
      },
      movies: function movies(_, filters) {
        return queries.getMovies(filters);
      },
      players: function players(_, filters) {
        return playerRepository.getPlayers(filters);
      },
      clashs: function clashs(_, filters) {
        return clashRepository.getClash(filters);
      },
      votes: function votes(_, filters) {
        return voteRepository.getVote(filters);
      },
      memes: function memes(_, filters) {
        return memeRepository.getMeme(filters);
      },
      rounds: function rounds(_, filters) {
        return roundRepository.getRound(filters);
      }
    },
    // Prototypes des fonctions POST, UPDATE, DELETE
    Mutation: {
      addMovie: async function addMovie(_, movie) {
        var newMovie = await queries.addMovie(movie);

        return newMovie[0];
      },
      updateMovie: async function updateMovie(_, movie) {
        var newMovie = await queries.updateMovie(movie);

        return newMovie[0];
      },
      deleteMovie: async function deleteMovie(_, movieId) {
        var deletedMovie = await queries.deleteMovie(movieId);

        return deletedMovie[0];
      },

      addComment: async function addComment(_, comment) {
        var newComment = await queries.addComment(comment);

        return newComment[0];
      },
      updateComment: async function updateComment(_, comment) {
        var newComment = await queries.updateComment(comment);

        return newComment[0];
      },
      deleteComment: async function deleteComment(_, commentId) {
        var deletedComment = await queries.deleteComment(commentId);

        return deletedComment[0];
      },

      addAuthor: async function addAuthor(_, author) {
        var newAuthor = await queries.addAuthor(author);

        return newAuthor[0];
      },
      updateAuthor: async function updateAuthor(_, author) {
        var newAuthor = await queries.updateAuthor(author);

        return newAuthor[0];
      },
      deleteAuthor: async function deleteAuthor(_, authorId) {
        var deletedAuthor = await queries.deleteAuthor(authorId);

        return deletedAuthor[0];
      },

      addPlayer: async function addPlayer(_, player) {
        var newPlayer = await playerRepository.addPlayer(player);
        return newPlayer;
      },
      updatePlayer: async function updatePlayer(_, player) {
        var newPlayer = await playerRepository.updatePlayer(player);
        return newPlayer;
      },
      deletePlayer: async function deletePlayer(_, playerId) {
        var deletedPlayer = await playerRepository.deleteAuthor(playerId);

        return deletedPlayer[0];
      },

      addClash: async function addClash(_, clash) {
        var newClash = await clashRepository.addClash(clash);

        return newClash[0];
      },
      updateClash: async function updateClash(_, clash) {
        var newClash = await clashRepository.updateClash(clash);

        return newClash[0];
      },
      deleteClash: async function deleteClash(_, clashId) {
        var deletedClash = await queries.deleteClash(clashId);

        return deletedClash[0];
      }
    },
    // Fonctions de récupération des données d'un auteur à partir d'un commentaire
    Comment: {
      author: async function author(comment) {
        var author = await queries.getAuthors({ author_id: comment.author });
        return author[0];
      }
    },
    // Fonctions de récupération des données de commentaires à partir d'un film
    Movie: {
      comments: async function comments(movie) {
        var arr = await Promise.all(movie.comments.map(async function (comment) {
          var coms = await queries.getComments({ comment_id: comment });
          return coms[0];
        }));
        return arr;
      }
    },

    Round: {
      meme: async function meme(round) {
        var memes = await Promise.all(round.meme.map(async function (memeID) {
          var meme = await memeRepository.getMeme({ _id: memeID });
          return meme[0];
        }));
        return memes;
      },
      vote: async function vote(round) {
        var votes = await Promise.all(round.vote.map(async function (voteID) {
          var vote = await voteRepository.getVote({ _id: voteID });
          return vote[0];
        }));
        return votes;
      },
      winner: async function winner(round) {
        var player = await playerRepository.getPlayers({ _id: round.winner });
        return player[0];
      }
    },

    Clash: {
      competitors: async function competitors(clash) {
        var players = await Promise.all(clash.competitors.map(async function (playerID) {
          var player = await playerRepository.getPlayers({ _id: playerID });
          return player[0];
        }));
        return players;
      },
      suscribers: async function suscribers(clash) {
        var players = await Promise.all(clash.suscribers.map(async function (playerID) {
          var player = await playerRepository.getPlayers({ _id: playerID });
          return player[0];
        }));
        return players;
      },
      round: async function round(clash) {
        var rounds = await Promise.all(clash.round.map(async function (roundID) {
          var round = await roundRepository.getRound({ _id: roundID });
          return round[0];
        }));
        return rounds;
      },
      winner: async function winner(round) {
        var player = await playerRepository.getPlayers({ _id: round.winner });
        return player[0];
      }
    }

  }, _defineProperty(_resolvers, 'Clash', {
    competitors: async function competitors(clash) {
      var players = await Promise.all(clash.competitors.map(async function (playerID) {
        var player = await playerRepository.getPlayers({ _id: playerID });
        return player[0];
      }));
      return players;
    },
    suscribers: async function suscribers(clash) {
      var players = await Promise.all(clash.suscribers.map(async function (playerID) {
        var player = await playerRepository.getPlayers({ _id: playerID });
        return player[0];
      }));
      return players;
    },
    round: async function round(clash) {
      var rounds = await Promise.all(clash.round.map(async function (roundID) {
        var round = await roundRepository.getRound({ _id: roundID });
        return round[0];
      }));
      return rounds;
    },
    winner: async function winner(round) {
      var player = await playerRepository.getPlayers({ _id: round.winner });
      return player[0];
    }
  }), _defineProperty(_resolvers, 'Vote', {
    user: async function user(vote) {
      var player = await playerRepository.getPlayers({ _id: vote.user });
      return player[0];
    },
    for: async function _for(vote) {
      var meme = await memeRepository.getMeme({ _id: round.for });
      return meme[0];
    }
  }), _defineProperty(_resolvers, 'Meme', {
    player: async function player(meme) {
      var player = await playerRepository.getPlayers({ _id: meme.player });
      return player[0];
    }
  }), _resolvers)
};

module.exports = schema;