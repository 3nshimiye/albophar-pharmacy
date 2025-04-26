const mongoose = require('mongoose');

const refillSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  prescriptionDetails: { type: String, required: true },
  preferredPickupTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Refill', refillSchema);