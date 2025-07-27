const express = require('express');
const Joi = require('joi');
const Order = require('../models/order');

const router = express.Router();

// Validation schema
const orderValidationSchema = Joi.object({
  firstName: Joi.string().trim().max(50).required(),
  lastName: Joi.string().trim().max(50).required(),
  address: Joi.string().trim().max(200).required(),
  email: Joi.string().email().required(),
  items: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      price: Joi.number().min(0).required(),
      quantity: Joi.number().integer().min(1).required()
    })
  ).min(1).required(),
  total: Joi.number().min(0).required(),
  orderDate: Joi.date().optional()
});

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error, value } = orderValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        message: 'Validation error',
        details: error.details.map(detail => detail.message)
      });
    }

    // Verify total calculation
    const calculatedTotal = value.items.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );
    
    if (Math.abs(calculatedTotal - value.total) > 0.01) {
      return res.status(400).json({ 
        message: 'Total amount mismatch',
        calculated: calculatedTotal,
        provided: value.total
      });
    }

    // Create order
    const order = new Order(value);
    const savedOrder = await order.save();

    console.log(`New order created: ${savedOrder._id} for ${savedOrder.email}`);

    res.status(201).json({
      message: 'Order created successfully',
      orderId: savedOrder._id,
      orderNumber: savedOrder._id.toString().slice(-8).toUpperCase()
    });

  } catch (error) {
    console.error('Error creating order:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Database validation error',
        details: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

// GET /api/orders - Get all orders (for admin)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .sort({ orderDate: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Order.countDocuments();

    res.json({
      orders,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// GET /api/orders/:id - Get specific order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).select('-__v');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid order ID' });
    }
    
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// PUT /api/orders/:id/status - Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Invalid status', 
        validStatuses 
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-__v');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log(`Order ${order._id} status updated to: ${status}`);
    res.json({ message: 'Order status updated', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

module.exports = router;

// ### .env