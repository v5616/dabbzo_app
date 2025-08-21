import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Menu item description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Menu item price is required'],
  },
  image: {
    type: String,
    default: '/images/default-food.jpg',
  },
});

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vendor name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Vendor description is required'],
  },
  image: {
    type: String,
    default: '/images/default-vendor.jpg',
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5,
  },
  address: {
    type: String,
    required: [true, 'Vendor address is required'],
  },
  menu: [menuItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Vendor || mongoose.model('Vendor', vendorSchema);