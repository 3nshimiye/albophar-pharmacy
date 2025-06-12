// routes/refills.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  submitRefill,
  getRefills,
  updateRefillStatus
} = require('../controllers/refillController');
const { protect } = require('../middleware/authMiddleware');

// Multer setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/refills/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Public - Submit refill
router.post('/', upload.single('file'), submitRefill);

// Admin - View and update refills
router.get('/', protect, getRefills);
router.put('/:id/status', protect, updateRefillStatus);

module.exports = router;
