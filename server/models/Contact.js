const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true,
        required: [true, 'Phone is required']
    },
    message: {
        type: String
    },
    service: {
        type: String,
        enum: [
            'Executive Transport',
            'Scenic Tours',
            'Medical Emergency',
            'Cargo & Utility',
            'Wedding & Events',
            'Film & Photography',
            'Custom Charter',
            'Aircraft Maintenance',
            'Helicopter Services',
            'Training',
            'Other'
        ],
        default: 'Other',
        required: [true, 'Service type is required']
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed', 'new', 'contacted', 'resolved'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Contact', contactSchema); 