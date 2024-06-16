const { User, Product, Order, Category, Review } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    products: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        throw new Error('Failed to fetch products.');
      }
    },
    categories: async () => {
      try {
        const categories = await Category.find();
        return categories;
      } catch (error) {
        throw new Error('Failed to fetch categories.');
      }
    },
    orders: async () => {
      try {
        const orders = await Order.find();
        return orders;
      } catch (error) {
        throw new Error('Failed to fetch orders.');
      }
    },
    reviews: async () => {
      try {
        const reviews = await Review.find();
        return reviews;
      } catch (error) {
        throw new Error('Failed to fetch reviews.');
      }
    },
    user: async (parent, { username }) => {
      try {
        return await User.findOne({ username });
      } catch (error) {
        throw new Error('Failed to fetch user.');
      }
    },
    productById: async (parent, { _id }) => {  
      try {
        console.log("This is the id", _id);
        return await Product.findOne({ _id });
      } catch (error) {
        throw new Error('Failed to fetch product by ID.');
      }
    },
    categoryById: async (parent, { _id }) => {  
      try {
        console.log("This is the id", _id);
        return await Category.findOne({ _id });
      } catch (error) {
        throw new Error('Failed to fetch category by ID.');
      }
    },
    orderById: async (parent, { _id }) => {  
      try {
        console.log("This is the id", _id);
        return await Order.findOne({ _id });
      } catch (error) {
        throw new Error('Failed to fetch order by ID.');
      }
    },
    reviewById: async (parent, { _id }) => {  
      try {
        console.log("This is the id", _id);
        return await Review.findOne({ _id });
      } catch (error) {
        throw new Error('Failed to fetch review by ID.');
      }
    },
    me: async (parent, args, context) => {
      if (context.user) {
        try {
          const userinfo = await User.findOne({ _id: context.user._id });
          console.log("This is the user info", userinfo );
          return userinfo;
        } catch (error) {
          throw new Error('Failed to fetch user information.');
        }
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
  },
};

module.exports = resolvers