const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
