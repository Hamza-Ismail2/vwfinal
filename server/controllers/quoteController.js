const Quote = require('../models/Quote');
const sendLeadToSalesforce = require('../services/salesforceWebToLead');

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

    // Build Salesforce payload
    try {
      const sfPayload = {
        lead_source: 'new_quotes_page',
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        company: req.body.company || 'Individual',
        '00NPY00000CKmG5': req.body.serviceTypeTitle || req.body.serviceType, // New quotes service type
        '00NPY00000CK7b8': req.body.passengers ? `${req.body.passengers} ${req.body.passengers === '1' ? 'Passenger' : 'Passengers'}` : undefined,
        '00NPY00000CKKLR': req.body.flightDate,
        '00NPY00000CK7eM': req.body.additionalInfo || req.body.specialRequests,
      };
      await sendLeadToSalesforce(sfPayload);
    } catch (err) {
      console.error('Failed to send quote lead to Salesforce:', err.message);
    }

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