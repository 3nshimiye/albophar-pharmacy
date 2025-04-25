const mongoose = require('mongoose');

const RefillSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    prescriptionNumber: { type: String, required: true },
    deliveryOption: { type: String, required: true }, // pickup or delivery
    notes: { type: String },
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Refill', RefillSchema);