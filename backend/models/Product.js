const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Beauty', 'Electronics', 'Furniture', 'Fashion', 'Food'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isGST: {
    type: Boolean,
    required: true,
  },
  imageURL: {
    type: String,
    default: 'https://via.placeholder.com/250x250.png?text=Product+Image',
  },
  manufacturingDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Product', ProductSchema);