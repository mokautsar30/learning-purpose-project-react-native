const Follow = require("../models/follow");
const { ObjectId } = require("bson");

const follows = [
  {
    id: 1,
    followingId: 2,
    followerId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const resolvers = {
  Query: {
    GetFollows: async () => {
      const follows = await Follow.getAllFollows();
      return follows;
    },
  },
  Mutation: {
    followUser: async (_, { input }) => {
      const newFollow = {
        followingId: input.followingId,
        followerId: input.followerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const result = await Follow.followUser(newFollow);
      // follows.push(newFollow);
      return newFollow;
    },
  },
};

module.exports = resolvers;
