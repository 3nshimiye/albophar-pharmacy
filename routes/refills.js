const express = require('express');
const router = express.Router();
const Refill = require('../models/Refill');

// POST /api/refills - Create a new refill request
router.post('/', async (req, res) => {
    try {
        const refill = new Refill(req.body);
        await refill.save();
        res.status(201).json({ message: 'Refill request submitted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ✅ NEW: GET /api/refills - Fetch all refill requests
router.get('/', async (req, res) => {
    try {
        const refills = await Refill.find().sort({ createdAt: -1 });
        res.json(refills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch refills' });
    }
});

module.exports = router;