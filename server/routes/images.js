const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const {
    getImages,
    getImage,
    createImage,
    updateImage,
    deleteImage,
    bulkUploadImages
} = require('../controllers/imageController');

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = Date.now() + '-gallery' + ext;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    // Check file type
    if (file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/webp') {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, JPG, PNG and WebP files are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Public routes
router.get('/', getImages);
router.get('/:id', getImage);

// Admin routes (will need authentication middleware in production)
router.post('/', upload.single('image'), createImage);
router.put('/:id', upload.single('image'), updateImage);
router.delete('/:id', deleteImage);

// Bulk upload route
router.post('/bulk', upload.array('images', 20), bulkUploadImages);

module.exports = router; 