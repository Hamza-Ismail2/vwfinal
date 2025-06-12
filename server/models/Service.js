const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Service title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Service description is required']
    },
    category: {
        type: String,
        required: [true, 'Service category is required'],
        enum: ['Maintenance', 'Training', 'Operations', 'Consulting']
    },
    features: [{
        type: String,
        trim: true
    }],
    imageUrl: {
        type: String,
        required: [true, 'Service image is required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
serviceSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Service', serviceSchema); 