const User = require("../models/user");

const resolvers = {
  Query: {
    GetUsers: async () => {
      const users = await User.getAll();
      console.log(users);
      return users;
    },
    GetUserById: async (_, args) => {
      console.log(args);
      const findUser = await User.findUserById(args.id);
      return findUser;
    },
    GetUserByName: async (_, args) => {
      console.log(args);
      const findUsername = await User.findUserByName(args.username);
      return findUsername;
    },
  },
  Mutation: {
    // addUser: async (_, args) => {
    //     console.log(args);
    //   const newUser = {
    //     name: args.newUser.name,
    //     username: args.newUser.username,
    //     email: args.newUser.email,
    //     password: args.newUser.password,
    //   };
    //   const result = await User.createUser(newUser)
    //   // users.push(newUser);
    //   console.log(result);
    //   newUser._id = result.insertedId;
    //   return newUser;
    // },
    register: async (_, args) => {
      const user = await User.register(args.newUser);
      return user;
    },
    login: async (_, args) => {
      const result = await User.login(args.loginInput);
      return result;
    },
  },
};

module.exports = resolvers;
