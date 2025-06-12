// controllers/refillController.js
const Refill = require('../models/Refill');
const path = require('path');

// @desc    Submit a refill request
exports.submitRefill = async (req, res) => {
  try {
    const refill = new Refill({
      patientName: req.body.patientName,
      phone: req.body.phone,
      message: req.body.message,
      fileUrl: req.file ? `/uploads/refills/${req.file.filename}` : ''
    });
    const savedRefill = await refill.save();
    res.status(201).json(savedRefill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit refill' });
  }
};

// @desc    Get all refills (admin only)
exports.getRefills = async (req, res) => {
  try {
    const refills = await Refill.find();
    res.json(refills);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve refills' });
  }
};

// @desc    Update refill status
exports.updateRefillStatus = async (req, res) => {
  try {
    const refill = await Refill.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!refill) return res.status(404).json({ message: 'Refill not found' });
    res.json(refill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status' });
  }
};
