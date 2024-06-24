const { User, Product, Order, Category, Review, Collect } = require('../models');
const { signToken } = require('../utils/auth');

const removeProductFromCategory = async (parent, { productId }) => {
  try {
    const categories = await Category.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );
    return categories;
  } catch (error) {
    throw new Error(`Failed to remove product from category: ${error.message}`);
  }
};

const removeProductFromCollection = async (parent, { productId }) => {
  try {
    const collections = await Collect.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );
    return collections;
  } catch (error) {
    throw new Error(`Failed to remove product from collection: ${error.message}`);
  }
};

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate('cart');
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
        return await User.findOne({ username }).populate('cart.items.product');
      } catch (error) {
        throw new Error('Failed to fetch user.');
      }
    },
    getUserCart: async (_, { userId }) => {
      try {
       // Find the user by ID and populate the cart field
      const user = await User.findById(userId).populate('cart.items.product');
    
      if (!user) {
        throw new Error('User not found');
      }
    
      return user.cart;
      } catch (error) {
      throw new Error(`Failed to get user cart: ${error.message}`);
      }
    },
    productById: async (parent, { productById }) => {  
      try {
        console.log("This is the id", productById);
        return await Product.findById(productById);
      } catch (error) {
        throw new Error('Failed to fetch product by ID.');
      }
    },
    categoryById: async (parent, { categoryById }) => {  
      try {
        console.log("This is the id", categoryById);
        return await Category.findById(categoryById).populate('products');
      } catch (error) {
        throw new Error('Failed to fetch category by ID.');
      }
    },
    collectById: async (parent, { _id }) => {  
      try {
        console.log("This is the id", _id);
        return await Collect.findOne({ _id }).populate('products');
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
    addItemToCart: async (_, { userId, productId, quantity, size, color }) => {
      try {
        // Find the user and add item to cart
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        // Call addToCart method to handle cart operations
        await user.addToCart(productId, quantity, size, color);

        // Return the updated user object (cart is already updated in addToCart method)
        return user;
      } catch (error) {
        throw new Error(`Failed to add item to cart: ${error.message}`);
      }
    },
    removeItemFromCart: async (_, { userId, productId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        await user.removeFromCart(productId); // Use removeFromCart method

        return user; // Return the updated user object
      } catch (error) {
        throw new Error(`Failed to remove item from cart: ${error.message}`);
      }
    },
    addProduct: async (_, args) => {
      // Create a new product
      const {
        productName,
        description,
        price,
        size,
        color,
        stock,
        image,
        rating,
      } = args;
    
      try {
        const newProduct = new Product({
          productName,
          description,
          price,
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
      try {
        // Find and delete the product
        const deletedProduct = await Product.findOneAndDelete({ _id: deleteProductId });
        if (!deletedProduct) {
          throw new Error('Product not found.');
        }
    
        // Call the removeProductFromCategory resolver
        await removeProductFromCategory(parent, { productId: deleteProductId });
    
        // Call the removeProductFromCollection resolver
        await removeProductFromCollection(parent, { productId: deleteProductId });
    
        return deletedProduct;
      } catch (error) {
        throw new Error(`Failed to delete product: ${error.message}`);
      }
    },
    addProductToCategory: async (parent, { productId, categoryId }) => {
      try {
        // Find the product and category
        const product = await Product.findById(productId);
        const category = await Category.findById(categoryId);
    
        if (!product || !category) {
          throw new Error('Product or category not found.');
        }
    
        // Add the product to the category
        category.products.push(productId);
        await category.save();
    
        return product;
      } catch (error) {
        throw new Error(`Failed to add product to category: ${error.message}`);
      }
    },
    removeProductToCategory: async (parent, { productId, categoryId }, { models }) => {
      try {
        // Find the product and category
        const product = await models.Product.findById(productId);
        const category = await models.Category.findById(categoryId);
    
        if (!product || !category) {
          throw new Error('Product or category not found.');
        }
    
        // Remove the product from the category
        category.products.pull(productId);
        await category.save();
    
        return product;
      } catch (error) {
        throw new Error(`Failed to remove product from category: ${error.message}`);
      }
    },
    removeProductToCollect: async (parent, { productId, collectId }, { models }) => {
      try {
        // Find the product and collection
        const product = await models.Product.findById(productId);
        const collect = await models.Collect.findById(collectId);
    
        if (!product || !collect) {
          throw new Error('Product or collection not found.');
        }
    
        // Remove the product from the collection
        collect.products.pull(productId);
        await collect.save();
    
        return product;
      } catch (error) {
        throw new Error(`Failed to remove product from collection: ${error.message}`);
      }
    },        
    addProductToCollect: async (parent, { productId, collectId }) => {
      try {
        // Find the product and collection
        const product = await Product.findById(productId);
        const collect = await Collect.findById(collectId);
    
        if (!product || !collect) {
          throw new Error('Product or collection not found.');
        }
    
        // Add the product to the collection
        collect.products.push(productId);
        await collect.save();
    
        return product;
      } catch (error) {
        throw new Error(`Failed to add product to collection: ${error.message}`);
      }
    },    
    addCategory: async (_, { categoryName }) => {
      try {
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
    addCollect: async (_, { collectName }) => {
      try {
        // Create a new collection
        const newCollect = new Collect({ collectName });
    
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