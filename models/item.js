const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  // Item details
  name: { type: String },
  category: { type: String, required: true },
  region: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  coordinates: [
    {
      longitude: { type: String, required: true },
      latitude: { type: String, required: true },
    }
  ],
  model: { type: String },
  pictures: [
    {
      filename: { type: String, required: true },
      caption: { type: String }
    }
  ],
  description: { type: String, required: true },
  addedOn: { type: Date, default: Date.now },

  // User details
  addedBy: { type: String },
  addedByAvatar: { type: String },
  contact: { type: String },
  // Comments on item listing
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'users' },
      name: { type: String },
      avatar: { type: String },
      comment: { type: String, required: true },
      addedOn: { type: Date, default: Date.now }
    }
  ]
});

module.exports = Post = mongoose.model('items', ItemSchema);