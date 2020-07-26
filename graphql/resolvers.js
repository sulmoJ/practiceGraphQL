import { getMovies } from "./db";

const resolvers = {
  Query: {
    movies: (_, { limit, rating }) => getMovies(limit, rating),
    // movie: (_, { id }) => getbyId(id),
  },
};

export default resolvers;
