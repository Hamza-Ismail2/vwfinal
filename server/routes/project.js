const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename = Date.now() + '-project' + ext;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, JPG, PNG and WebP files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    }
});

// All routes are public
router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', upload.single('image'), createProject);
router.put('/:id', upload.single('image'), updateProject);
router.delete('/:id', deleteProject);

module.exports = router; 