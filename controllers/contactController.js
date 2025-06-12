// controllers/contactController.js
const Contact = require('../models/Contact');

// @desc    Submit contact form
exports.submitContactForm = async (req, res) => {
  try {
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' });
  }
};

// @desc    Get all contacts (admin)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve messages' });
  }
};
