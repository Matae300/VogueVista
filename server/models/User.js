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
      },
    }],
  },
  orders: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Order' 
  }]
});

userSchema.methods.addToCart = function (productId, quantity = 1) {
  const cartItem = this.cart.items.find(item => item.product.toString() === productId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    this.cart.items.push({ product: productId, quantity });
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