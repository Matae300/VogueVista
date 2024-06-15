const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product', 
    required: true, 
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, 
    max: 5, 
  },
});

const Review = model('Review', reviewSchema);

module.exports = Review;
