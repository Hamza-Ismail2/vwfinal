const Blog = require('../models/Blog');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Create email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Create new blog post (admin only)
exports.createBlog = async (req, res) => {
    try {
        const { title, desc, type, tags } = req.body;
        let img = req.file ? `/uploads/${req.file.filename}` : undefined;
        if (!img) {
            return res.status(400).json({ success: false, error: 'Image file is required (jpg or png).' });
        }
        const blog = await Blog.create({
            title,
            desc,
            img,
            type,
            tags: tags ? (Array.isArray(tags) ? tags : [tags]) : []
        });
        res.status(201).json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all blog posts (public)
exports.getBlogs = async (req, res) => {
    try {
        console.log('Fetching all blog posts...');
        const { type, search } = req.query;
        let query = {};

        // Filter by type
        if (type) {
            query.type = type;
        }

        // Search in title, description and tags
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { desc: { $regex: search, $options: 'i' } },
                { tags: { $regex: search, $options: 'i' } }
            ];
        }

        const blogs = await Blog.find(query)
            .sort('-createdAt');

        console.log(`Found ${blogs.length} blog posts`);
        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get single blog post (public)
exports.getBlog = async (req, res) => {
    try {
        console.log('Fetching blog post:', req.params.id);
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            console.log('Blog post not found');
            return res.status(404).json({
                success: false,
                error: 'Blog post not found'
            });
        }

        console.log('Blog post found:', blog.title);
        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update blog post (admin only)
exports.updateBlog = async (req, res) => {
    try {
        const { title, desc, type, tags } = req.body;
        const role = req.body.role || req.headers['x-user-role'];
        if (role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Only admins can update blog posts' });
        }
        let updateFields = {
            title,
            desc,
            type,
            tags: tags ? (Array.isArray(tags) ? tags : [tags]) : []
        };
        if (req.file) {
            updateFields.img = `/uploads/${req.file.filename}`;
        }
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true, runValidators: true }
        );
        res.status(200).json({ success: true, data: updatedBlog });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete blog post (admin only)
exports.deleteBlog = async (req, res) => {
    try {
        console.log('Deleting blog post:', req.params.id);

        // Temporary admin check: allow if role is admin in body or header
        const role = req.body.role || req.headers['x-user-role'];
        if (role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Only admins can delete blog posts'
            });
        }

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            console.log('Blog post not found');
            return res.status(404).json({
                success: false,
                error: 'Blog post not found'
            });
        }

        await Blog.findByIdAndDelete(req.params.id);
        console.log('Blog post deleted successfully');
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get all blog posts (admin only - includes drafts)
exports.getAdminBlogs = async (req, res) => {
    try {
        console.log('Fetching all blog posts for admin...');

        // Verify admin role
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Only admins can view all blog posts'
            });
        }

        const blogs = await Blog.find()
            .populate('author', 'username')
            .sort('-createdAt');

        console.log(`Found ${blogs.length} blog posts`);
        res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}; 