const Quote = require('../models/Quote');

// Create a new quote request
exports.createQuote = async (req, res) => {
  try {
    const requiredFields = ['serviceType', 'firstName', 'lastName', 'email'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }
    const quote = await Quote.create(req.body);
    res.status(201).json({ success: true, data: quote });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all quote requests
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: quotes.length, data: quotes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single quote request
exports.getQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, error: 'Quote request not found' });
    }
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update quote request
exports.updateQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!quote) {
      return res.status(404).json({ success: false, error: 'Quote request not found' });
    }
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete quote request
exports.deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, error: 'Quote request not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Mark as read/unread
exports.markRead = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { read: req.body.read },
      { new: true }
    );
    if (!quote) {
      return res.status(404).json({ success: false, error: 'Quote request not found' });
    }
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Update status
exports.updateStatus = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!quote) {
      return res.status(404).json({ success: false, error: 'Quote request not found' });
    }
    res.status(200).json({ success: true, data: quote });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}; 