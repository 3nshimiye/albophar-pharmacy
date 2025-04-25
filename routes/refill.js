const express = require('express');
const router = express.Router();
const Refill = require('../models/Refill');

// POST /api/refill
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

module.exports = router;