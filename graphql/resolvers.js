import { people, getbyId } from "./db";

const resolvers = {
  Query: {
    people: () => people,
    person: (_, { id }) => getbyId(id),
  },
};

export default resolvers;
