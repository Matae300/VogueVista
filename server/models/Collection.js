const { Schema, model } = require('mongoose');

const collectionSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  categories: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Category' 
  }]
});

const Collection = model('Collection', collectionSchema);

module.exports = Collection;