const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate('threads');
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).populate('threads');
    },
    me: async (parent, args, context) => {
      if (context.user) {
       let userinfo =  await User.findOne({ _id: context.user._id }).populate('threads');
        console.log("This is the user info", userinfo );
        return userinfo;
      }
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error('Invalid email or password');
      }

      const token = signToken(user);
      return { token, user };
    },
  }
}

module.exports = resolvers