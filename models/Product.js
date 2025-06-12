// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  countInStock: {
    type: Number,
    default: 0
  },
  isPrescriptionRequired: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
