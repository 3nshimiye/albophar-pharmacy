// routes/contact.js
const express = require('express');
const router = express.Router();
const { submitContactForm, getContacts } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/contact
router.post('/', submitContactForm);

// @route   GET /api/contact (Admin only)
router.get('/', protect, getContacts);

module.exports = router;
