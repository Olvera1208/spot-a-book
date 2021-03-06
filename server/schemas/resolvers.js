const { User } = require('../models');
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new userError('Must be logged in!');
    },
  },
  Mutation: {

    createUser: async (parent, { username, email, password }) => {
        const user = await User.create({username, email, password});
        const token = signToken(user);
        return {token, user};
      },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with email address');
      }
      const CorrectPassword = await user.isCorrectPassword(password);
      if (!CorrectPassword) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;