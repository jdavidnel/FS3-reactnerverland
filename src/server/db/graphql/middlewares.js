const { readFileSync } = require('fs');
const { makeExecutableSchema } = require('graphql-tools');

const queries = require('../queries/queries');
const clashRepository = require('../queries/ClashRepository');
const voteRepository = require('../queries/VoteRepository');
const memeRepository = require('../queries/MemeRepository');
const roundRepository = require('../queries/RoundRepository');
const playerRepository = require('../queries/PlayerRepository');

const schema = {
  typeDefs: readFileSync('src/server/db/graphql/schemas.graphql', 'utf8'),
  resolvers: {
    // Prototypes des fonctions GET
    Query: {
      authors: (_, filters) => queries.getAuthors(filters),
      comments: (_, filters) => queries.getComments(filters),
      movies: (_, filters) =>  { return queries.getMovies(filters)},
      players: (_, filters) => { return playerRepository.getPlayers(filters); },
      clashs: (_, filters) => { return clashRepository.getClash(filters); },
      votes: (_, filters) => { return voteRepository.getVote(filters); },
      memes: (_, filters) => { return memeRepository.getMeme(filters); },
      rounds: (_, filters) => { return roundRepository.getRound(filters); },
    },
    // Prototypes des fonctions POST, UPDATE, DELETE
    Mutation: {
      addMovie: async (_, movie) => {
        const newMovie = await queries.addMovie(movie);

        return newMovie[0];
      },
      updateMovie: async (_, movie) => {
        const newMovie = await queries.updateMovie(movie);

        return newMovie[0];
      },
      deleteMovie: async (_, movieId) => {
        const deletedMovie = await queries.deleteMovie(movieId);

        return deletedMovie[0];
      },

      addComment: async (_, comment) => {
        const newComment = await queries.addComment(comment);

        return newComment[0];
      },
      updateComment: async (_, comment) => {
        const newComment = await queries.updateComment(comment);

        return newComment[0];
      },
      deleteComment: async (_, commentId) => {
        const deletedComment = await queries.deleteComment(commentId);

        return deletedComment[0];
      },

      addAuthor: async (_, author) => {
        const newAuthor = await queries.addAuthor(author);

        return newAuthor[0];
      },
      updateAuthor: async (_, author) => {
        const newAuthor = await queries.updateAuthor(author);

        return newAuthor[0];
      },
      deleteAuthor: async (_, authorId) => {
        const deletedAuthor = await queries.deleteAuthor(authorId);

        return deletedAuthor[0];
      },
      
      addPlayer: async (_, player) => {
        const newPlayer = await playerRepository.addPlayer(player);
        return newPlayer;
      },
      updatePlayer: async (_, player) => {
        const newPlayer = await playerRepository.updatePlayer(player);
        return newPlayer;
      },
      deletePlayer: async (_, playerId) => {
        const deletedPlayer = await playerRepository.deleteAuthor(playerId);

        return deletedPlayer[0];
      },

      addClash: async (_, clash) => {
        const newClash = await clashRepository.addClash(clash);

        return newClash[0];
      },
      updateClash: async (_, clash) => {
        const newClash = await clashRepository.updateClash(clash);

        return newClash[0];
      },
      deleteClash: async (_, clashId) => {
        const deletedClash = await queries.deleteClash(clashId);

        return deletedClash[0];
      },
    },
    // Fonctions de récupération des données d'un auteur à partir d'un commentaire
    Comment: {
      author: async (comment) => {
        const author = await queries.getAuthors({ author_id: comment.author });
        return author[0];
      },
    },
    // Fonctions de récupération des données de commentaires à partir d'un film
    Movie: {
      comments: async (movie) => {
        const arr = await Promise.all(movie.comments.map(async (comment) => {
          const coms = await queries.getComments({ comment_id: comment });
          return coms[0];
        }));
        return arr;
      },
    },

    Round: {
      meme: async (round) => {
        const memes = await Promise.all(round.meme.map(async (memeID) => {
          const meme = await memeRepository.getMeme({ _id: memeID });
          return meme[0];
        }));
        return memes;
      },
      vote: async (round) => {
        const votes = await Promise.all(round.vote.map(async (voteID) => {
          const vote = await voteRepository.getVote({ _id: voteID });
          return vote[0];
        }));
        return votes;
      },
      winner: async (round) => {
        const player = await playerRepository.getPlayers({ _id: round.winner });
        return player[0];
      },
    },

    Clash: {
      competitors: async (clash) => {
        const players = await Promise.all(clash.competitors.map(async (playerID) => {
          const player = await playerRepository.getPlayers({ _id: playerID });
          return player[0];
        }));
        return players;
      },
      suscribers: async (clash) => {
        const players = await Promise.all(clash.suscribers.map(async (playerID) => {
          const player = await playerRepository.getPlayers({ _id: playerID });
          return player[0];
        }));
        return players;
      },
      round: async (clash) => {
        const rounds = await Promise.all(clash.round.map(async (roundID) => {
          const round = await roundRepository.getRound({ _id: roundID });
          return round[0];
        }));
        return rounds;
      },
      winner: async (round) => {
        const player = await playerRepository.getPlayers({ _id: round.winner });
        return player[0];
      },
    },

    Clash: {
      competitors: async (clash) => {
        const players = await Promise.all(clash.competitors.map(async (playerID) => {
          const player = await playerRepository.getPlayers({ _id: playerID });
          return player[0];
        }));
        return players;
      },
      suscribers: async (clash) => {
        const players = await Promise.all(clash.suscribers.map(async (playerID) => {
          const player = await playerRepository.getPlayers({ _id: playerID });
          return player[0];
        }));
        return players;
      },
      round: async (clash) => {
        const rounds = await Promise.all(clash.round.map(async (roundID) => {
          const round = await roundRepository.getRound({ _id: roundID });
          return round[0];
        }));
        return rounds;
      },
      winner: async (round) => {
        const player = await playerRepository.getPlayers({ _id: round.winner });
        return player[0];
      },
    },

    Vote: {
      user: async (vote) => {
        const player = await playerRepository.getPlayers({ _id: vote.user });
        return player[0];
      },
      for: async (vote) => {
        const meme = await memeRepository.getMeme({ _id: round.for });
        return meme[0];
      },
    },

    Meme: {
      player: async (meme) => {
        const player = await playerRepository.getPlayers({ _id: meme.player });
        return player[0];
      },
    },
  },
};

module.exports = schema;