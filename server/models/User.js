const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  cart: {
    items: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
      size: {
        type: String,
        required: true,
      }, 
      color: {
        type: String,
        required: true,
      }, 
    }],
  },
  orders: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Order' 
  }]
});

userSchema.methods.addToCart = function (productId, quantity = 1, size, color) {
  const cartItem = this.cart.items.find(item => item.product.toString() === productId);

  if (cartItem) {
    // Update existing item's quantity, size, and color if they are provided
    cartItem.quantity += quantity;
    if (size) cartItem.size = size;
    if (color) cartItem.color = color;
  } else {
    // Add new item to cart
    this.cart.items.push({ product: productId, quantity, size, color });
  }

  return this.save();
};

userSchema.methods.removeFromCart = async function(itemId) {
  try {
    // Find the index of the item to remove
    const index = this.cart.items.findIndex(item => item._id.toString() === itemId);
    if (index !== -1) {
      // Remove the item from the cart array
      this.cart.items.splice(index, 1);
    }
    await this.save(); // Save the user with updated cart
  } catch (error) {
    throw new Error(`Failed to remove item from cart: ${error.message}`);
  }
};

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;