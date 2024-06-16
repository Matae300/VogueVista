const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  categoryName: { 
    type: String, 
    required: true, 
    unique: true 
  },
  products: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Product'
  }],
  collect: { 
    type: Schema.Types.ObjectId, 
    ref: 'Collect' 
  }
});

const Category = model('Category', categorySchema);

module.exports = Category;
