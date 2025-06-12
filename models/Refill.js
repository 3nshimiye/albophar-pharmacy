// models/Refill.js
const mongoose = require('mongoose');

const refillSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  fileUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'processed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Refill', refillSchema);
