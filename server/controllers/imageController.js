const Image = require('../models/Image');
const fs = require('fs');
const path = require('path');

// @desc    Get all images
// @route   GET /api/images
// @access  Public
const getImages = async (req, res) => {
    try {
        const images = await Image.find({ isActive: true })
            .sort({ order: 1, createdAt: -1 })
            .select('title description url filename originalName contentType size createdAt');
        const host = req.get('host');
        const protocol = req.protocol;
        const imagesWithFullUrl = images
            .filter(img => typeof img.url === 'string' && img.url.length > 0)
            .map(img => ({
                ...img.toObject(),
                url: img.url.startsWith('http') ? img.url : `${protocol}://${host}${img.url}`
            }));
        res.status(200).json({
            success: true,
            count: imagesWithFullUrl.length,
            data: imagesWithFullUrl
        });
    } catch (error) {
        console.error('Error in getImages:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching images',
            error: error.message
        });
    }
};

// @desc    Get single image
// @route   GET /api/images/:id
// @access  Public
const getImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }

        res.status(200).json({
            success: true,
            data: image
        });
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching image',
            error: error.message
        });
    }
};

// @desc    Create new image
// @route   POST /api/images
// @access  Private (Admin)
const createImage = async (req, res) => {
    try {
        const { title, description, order } = req.body;
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image file'
            });
        }
        const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        const imageData = {
            title,
            description,
            url,
            filename: req.file.filename,
            originalName: req.file.originalname,
            contentType: req.file.mimetype,
            size: req.file.size,
            order: order || 0
        };
        const image = await Image.create(imageData);
        res.status(201).json({
            success: true,
            message: 'Image created successfully',
            data: image
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating image',
            error: error.message
        });
    }
};

// @desc    Update image
// @route   PUT /api/images/:id
// @access  Private (Admin)
const updateImage = async (req, res) => {
    try {
        const { title, description, order, isActive } = req.body;
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }
        if (title) image.title = title;
        if (description) image.description = description;
        if (order !== undefined) image.order = order;
        if (isActive !== undefined) image.isActive = isActive;
        if (req.file) {
            // Remove old file
            const oldPath = path.join(__dirname, '../uploads', image.filename);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            // Update with new file
            image.url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            image.filename = req.file.filename;
            image.originalName = req.file.originalname;
            image.contentType = req.file.mimetype;
            image.size = req.file.size;
        }
        await image.save();
        res.status(200).json({
            success: true,
            message: 'Image updated successfully',
            data: image
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error updating image',
            error: error.message
        });
    }
};

// @desc    Delete image
// @route   DELETE /api/images/:id
// @access  Private (Admin)
const deleteImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({
                success: false,
                message: 'Image not found'
            });
        }
        // Remove file from disk
        const filePath = path.join(__dirname, '../uploads', image.filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        await Image.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting image',
            error: error.message
        });
    }
};

// @desc    Bulk upload images
// @route   POST /api/images/bulk
// @access  Private (Admin)
const bulkUploadImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please upload at least one image file'
            });
        }

        const images = [];
        const errors = [];

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            try {
                // Read the uploaded file as binary data
                const imageBuffer = fs.readFileSync(file.path);

                const imageData = {
                    title: req.body.titles ? req.body.titles[i] : `Gallery Image ${i + 1}`,
                    description: req.body.descriptions ? req.body.descriptions[i] : 'Professional helicopter services image',
                    image: {
                        data: imageBuffer,
                        contentType: file.mimetype,
                        filename: file.filename,
                        originalName: file.originalname,
                        size: file.size
                    },
                    order: i
                };

                // Delete the temporary uploaded file
                fs.unlinkSync(file.path);

                const image = await Image.create(imageData);
                images.push(image);
            } catch (error) {
                errors.push({
                    file: file.filename,
                    error: error.message
                });
                
                // Clean up failed upload
                if (fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            }
        }

        res.status(201).json({
            success: true,
            message: `${images.length} images uploaded successfully`,
            data: images,
            errors: errors.length > 0 ? errors : undefined
        });
    } catch (error) {
        console.error('Error bulk uploading images:', error);
        res.status(500).json({
            success: false,
            message: 'Error bulk uploading images',
            error: error.message
        });
    }
};

module.exports = {
    getImages,
    getImage,
    createImage,
    updateImage,
    deleteImage,
    bulkUploadImages
}; 