if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const userTypeDefs = require("./schema/userSchema");
const postTypeDefs = require("./schema/postSchema");
const userResolvers = require("./resolvers/userResolver");
const postResolvers = require("./resolvers/postResolvers");
const followTypedefs = require("./schema/followSchema");
const followResolvers = require("./resolvers/followresolvers");
const Follow = require("./models/follow");
const { connection } = require("./config/mongodb");
const jwt = require("jsonwebtoken");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypedefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
});

connection()
  .then((database) => {
    console.log("success connect to mongodb atlas");
    return startStandaloneServer(server, {
      context: async ({ req, res }) => {
        return {
          auth: () => {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
              return null;
            }
            //ambil dari req header
            //harus decode
            // console.log(req.headers.authorization);
            const token = authorizationHeader.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decodedToken);
            return decodedToken;
          },
        };
      },
      listen: { port: process.env.PORT || 3000 },
    });
  })
  .then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
  })
  .catch((err) => console.log(err));
