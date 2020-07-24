const sulmo = {
  name: "sulmoJ",
  gender: "male",
  age: 24,
};

const resolvers = {
  Query: {
    person: () => sulmo,
  },
};

export default resolvers;
