const { User, Product, Order, Category, Review, Cart, Collect } = require('../models');
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
    collect: async () => {
      try {
        const collect = await Collect.find();
        return collect;
      } catch (error) {
        throw new Error('Failed to fetch collections.');
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
        return await Category.findById(_id);
      } catch (error) {
        throw new Error('Failed to fetch category by ID.');
      }
    },
    collectById: async (parent, { _id }) => {  
      try {
        console.log("This is the id", _id);
        return await Collect.findOne({ _id });
      } catch (error) {
        throw new Error('Failed to fetch collection by ID.');
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
    cartById: async (parent, { _id }) => {  
      try {
        console.log("This is the id", _id);
        return await Cart.findOne({ _id });
      } catch (error) {
        throw new Error('Failed to fetch cart by ID.');
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
    addProduct: async (_, args) => {
      const {
        productName,
        description,
        price,
        category,
        size,
        color,
        stock,
        image,
        rating,
      } = args;

      try {
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
          throw new Error('Category not found.');
        }

        const newProduct = new Product({
          productName,
          description,
          price,
          category: existingCategory._id,
          size,
          color,
          stock,
          image,
          rating,
        });

        await newProduct.save();
        return newProduct;
      } catch (error) {
        throw new Error(`Failed to add product: ${error.message}`);
      }
    },
    deleteProduct: async (parent, { deleteProductId }) => {
      return Product.findOneAndDelete({ _id: deleteProductId });
    },
    addCategory: async (_, { categoryName }) => {
      try {
        // Check if the category already exists
        const existingCategory = await Category.findOne({ categoryName });
        if (existingCategory) {
          throw new Error('Category already exists');
        }

        // Create a new category
        const newCategory = new Category({ categoryName });
        await newCategory.save();

        return newCategory;
      } catch (error) {
        throw new Error(`Failed to add category: ${error.message}`);
      }
    },
    deleteCategory: async (parent, { deleteCategoryId }) => {
      return Category.findOneAndDelete({ _id: deleteCategoryId });
    },
    addCollect: async (_, { collectName, categories }) => {
      try {
        // Check if categories exist
        const existingCategories = await Category.find({ _id: { $in: categories } });
        if (existingCategories.length !== categories.length) {
          throw new Error('One or more categories not found.');
        }
    
        // Create the new Collect
        const newCollect = new Collect({ collectName, categories });
    
        await newCollect.save();
    
        return newCollect;
      } catch (error) {
        throw new Error(`Failed to add collect: ${error.message}`);
      }
    },
    deleteCollect: async (parent, { deleteCollectId }) => {
      return Collect.findOneAndDelete({ _id: deleteCollectId });
    },
  },
};

module.exports = resolvers