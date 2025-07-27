const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  address: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  items: [orderItemSchema],
  total: { 
    type: Number, 
    required: true,
    min: 0
  },
  orderDate: { 
    type: Date, 
    default: Date.now 
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for efficient queries
orderSchema.index({ email: 1, orderDate: -1 });
orderSchema.index({ status: 1 });

module.exports = mongoose.model('Order', orderSchema);