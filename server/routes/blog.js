const express = require('express');
const router = express.Router();
const {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.fieldname + ext);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only jpg and png files are allowed!'), false);
  }
};
const upload = multer({ storage, fileFilter });

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlog);

// Admin routes
router.post('/', upload.single('img'), createBlog);
router.put('/:id', upload.single('img'), updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router; 