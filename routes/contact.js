const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// POST route for handling contact form submissions
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new ContactMessage({
            name,
            email,
            message,
            date: new Date()
        });

        await newMessage.save();
        res.status(200).send({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Error sending message.' });
    }
});

module.exports = router;