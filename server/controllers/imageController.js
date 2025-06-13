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
            .select('title description image createdAt');

        // Convert image data to base64 for frontend
        const imagesWithBase64 = images.map(image => {
            // Handle different image data formats for backwards compatibility
            if (image.image.data && Buffer.isBuffer(image.image.data)) {
                // New format: Binary data stored in database
                return {
                    _id: image._id,
                    title: image.title,
                    description: image.description,
                    createdAt: image.createdAt,
                    image: {
                        data: image.image.data.toString('base64'),
                        contentType: image.image.contentType,
                        filename: image.image.filename,
                        originalName: image.image.originalName,
                        size: image.image.size
                    }
                };
            } else {
                // Old format: Return error or placeholder
                console.warn(`Image ${image.title} has old format, needs migration`);
                return {
                    _id: image._id,
                    title: image.title,
                    description: image.description,
                    createdAt: image.createdAt,
                    image: {
                        data: null,
                        contentType: 'image/jpeg',
                        filename: 'placeholder.jpg',
                        originalName: 'placeholder.jpg',
                        size: 0,
                        needsMigration: true
                    }
                };
            }
        }).filter(img => img.image.data !== null); // Filter out images that need migration

        res.status(200).json({
            success: true,
            count: imagesWithBase64.length,
            data: imagesWithBase64
        });
    } catch (error) {
        console.error('Error fetching images:', error);
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

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload an image file'
            });
        }

        // Read the uploaded file as binary data
        const imageBuffer = fs.readFileSync(req.file.path);

        const imageData = {
            title,
            description,
            image: {
                data: imageBuffer,
                contentType: req.file.mimetype,
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size
            },
            order: order || 0
        };

        // Delete the temporary uploaded file since we're storing in DB
        fs.unlinkSync(req.file.path);

        const image = await Image.create(imageData);

        res.status(201).json({
            success: true,
            message: 'Image created successfully',
            data: image
        });
    } catch (error) {
        console.error('Error creating image:', error);
        
        // Clean up uploaded file if database save failed
        if (req.file) {
            const filePath = path.join(__dirname, '../uploads', req.file.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

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

        // Update fields
        if (title) image.title = title;
        if (description) image.description = description;
        if (order !== undefined) image.order = order;
        if (isActive !== undefined) image.isActive = isActive;

        // Handle new image file upload
        if (req.file) {
            // Read the new uploaded file as binary data
            const imageBuffer = fs.readFileSync(req.file.path);
            
            image.image = {
                data: imageBuffer,
                contentType: req.file.mimetype,
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size
            };

            // Delete the temporary uploaded file
            fs.unlinkSync(req.file.path);
        }

        await image.save();

        res.status(200).json({
            success: true,
            message: 'Image updated successfully',
            data: image
        });
    } catch (error) {
        console.error('Error updating image:', error);
        
        // Clean up uploaded file if update failed
        if (req.file) {
            const filePath = path.join(__dirname, '../uploads', req.file.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

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

        // No need to delete files from filesystem since images are stored in DB
        await Image.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Image deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting image:', error);
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