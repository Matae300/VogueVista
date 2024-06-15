const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
  },
  description: {
    type: String,
    trim: true, 
    default: '',
  },
  image: {
    type: String,
    trim: true, 
  },
});

const Category = model('Category', categorySchema);

module.exports = Category;
