const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  params: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model('Event', EventSchema); 