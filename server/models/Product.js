const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
    trim: true,
  },
  color: [{
    type: String,
    required: true,
    trim: true,
  }],
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
  }
});

const Product = model('Product', productSchema);

module.exports = Product;
