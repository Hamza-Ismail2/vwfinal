const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  aircraft: String,
  passengers: String,
  flightDate: String,
  flightTime: String,
  duration: String,
  origin: String,
  destination: String,
  specialRequests: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  company: String,
  budget: String,
  flexibility: String,
  additionalInfo: String,
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'quoted', 'accepted', 'rejected'],
    default: 'pending'
  },
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Quote', quoteSchema); 