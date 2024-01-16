
const follows = [
    {
      id: 1,
      followingId: 2,
      followerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ];

//schema
const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID!
        followerId: ID!
        createdAt: String
        updatedAt: String
    }

    input FollowInput {
      followingId: ID!
      followerId: ID!
  }
    type Query {
        GetFollows: [Follow]
    }

    type Mutation {
      followUser(input: FollowInput): Follow
  }
`;

module.exports = typeDefs