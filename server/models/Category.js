const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  products: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Product'
  }],
  collection: { 
    type: Schema.Types.ObjectId, 
    ref: 'Collection' 
  }
});

const Category = model('Category', categorySchema);

module.exports = Category;
