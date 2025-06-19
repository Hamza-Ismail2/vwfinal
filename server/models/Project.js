const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['Construction Support', 'Science & Research', 'Aerial Cinematography', 'Emergency Services', 'Other'],
        default: 'Other'
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        trim: true
    },
    image: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['Active', 'Completed', 'On Hold'],
        default: 'Active'
    },
    challenges: [{
        type: String,
        trim: true
    }],
    solutions: [{
        type: String,
        trim: true
    }],
    outcomes: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema); 