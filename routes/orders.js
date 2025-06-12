// routes/orders.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Multer setup for prescription file upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/orders/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// @route POST /api/orders - Place an order
router.post('/', protect, upload.single('prescriptionFile'), placeOrder);

// @route GET /api/orders/my - Get logged-in user's orders
router.get('/my', protect, getUserOrders);

// @route GET /api/orders - Get all orders (admin)
router.get('/', protect, getAllOrders);

// @route PUT /api/orders/:id/status - Update order status
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
