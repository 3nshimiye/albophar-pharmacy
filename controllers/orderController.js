// controllers/orderController.js
const Order = require('../models/Order');

// @desc    Place new order
exports.placeOrder = async (req, res) => {
  try {
    const order = new Order({
      user: req.user._id,
      orderItems: req.body.orderItems,
      totalPrice: req.body.totalPrice,
      prescriptionFile: req.file ? `/uploads/orders/${req.file.filename}` : ''
    });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order' });
  }
};

// @desc    Get current user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user orders' });
  }
};

// @desc    Get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all orders' });
  }
};

// @desc    Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: req.body.paymentStatus },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order' });
  }
};
