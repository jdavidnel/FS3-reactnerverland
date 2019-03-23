const { readFileSync } = require('fs');
const { makeExecutableSchema } = require('graphql-tools');

const queries = require('../queries/queries');

const schema = makeExecutableSchema({
  typeDefs: readFileSync('src/server/db/graphql/schemas.graphql', 'utf8'),
  resolvers: {
    // Prototypes des fonctions GET
    Query: {
      authors: (_, filters) => queries.getAuthors(filters),
      comments: (_, filters) => queries.getComments(filters),
      movies: (_, filters) => queries.getMovies(filters),
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
  },
});

module.exports = schema;
