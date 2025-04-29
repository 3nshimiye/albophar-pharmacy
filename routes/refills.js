const express = require('express');
const router = express.Router();
const Refill = require('../models/Refill');
const upload = require('../middleware/uploadMiddleware'); // Import Multer middleware

// ✅ POST /api/refills - Create a new refill request with file upload
router.post('/', upload.single('prescriptionFile'), async (req, res) => {
    try {
        const { patientName, phoneNumber, prescriptionDetails, preferredPickupTime } = req.body;
        const prescriptionFile = req.file ? req.file.path : null;

        const refill = new Refill({
            patientName,
            phoneNumber,
            prescriptionDetails,
            preferredPickupTime,
            prescriptionFile
        });

        await refill.save();
        res.status(201).json({ message: 'Refill request submitted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ✅ GET /api/refills - Fetch all refill requests
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