// routes/products.js
const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Public
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin Only
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
