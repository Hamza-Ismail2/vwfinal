const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        trim: true,
        maxlength: [250, 'Description cannot be more than 250 characters']
    },
    url: {
        type: String,
        required: [true, 'Please provide image URL']
    },
    filename: {
        type: String,
        required: [true, 'Please provide image filename']
    },
    originalName: {
        type: String,
        required: [true, 'Please provide original filename']
    },
    contentType: {
        type: String,
        required: [true, 'Please provide image content type']
    },
    size: {
        type: Number,
        required: [true, 'Please provide file size']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Index for better query performance
ImageSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model('Image', ImageSchema); 