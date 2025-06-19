const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    desc: {
        type: String,
        required: [true, 'Please provide description'],
        trim: true
    },
    img: {
        type: String,
        required: [true, 'Please provide an image file path']
    },
    type: {
        type: String,
        required: [true, 'Please provide a type'],
        enum: ['Helicopter Services', 'Industry News', 'Company Updates', 'Safety Tips', 'Other'],
        default: 'Other'
    },
    tags: [{
        type: String,
        trim: true
    }],
    slug: {
        type: String,
        unique: true,
        sparse: true // Allow multiple null values but unique non-null values
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Create slug from title before saving
BlogSchema.pre('save', function(next) {
    if (this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim('-');
        
        // Add timestamp to ensure uniqueness
        if (this.isNew) {
            this.slug += '-' + Date.now();
        }
    }
    next();
});

module.exports = mongoose.model('Blog', BlogSchema); 