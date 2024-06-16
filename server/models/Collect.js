const { Schema, model } = require('mongoose');

const collectSchema = new Schema({
  collectName: {
    type: String,
    required: true,
    unique: true, 
  },
  categories: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Category' 
  }]
});

collectSchema.index({ collectName: 1 }, { unique: true });

const Collect = model('Collect', collectSchema);

module.exports = Collect;