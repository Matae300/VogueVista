const { Schema, model } = require('mongoose');

const collectSchema = new Schema({
  collectName: {
    type: String,
    required: true,
    unique: true, 
  },
  products: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Product'
  }]
});

collectSchema.index({ collectName: 1 }, { unique: true });

const Collect = model('Collect', collectSchema);

module.exports = Collect;