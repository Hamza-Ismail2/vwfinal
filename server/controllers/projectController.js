const Project = require('../models/Project');

// Create new project
exports.createProject = async (req, res) => {
    try {
        const {
            title,
            category,
            description,
            status,
            challenges,
            solutions,
            outcomes
        } = req.body;
        
        // Build image URLs array if files uploaded
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = req.files.map(file => 
                `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
            );
        }

        // utility to split
        const splitField = (field) => {
            if (!field) return [];
            if (Array.isArray(field)) return field;
            return String(field).split(',').map(s => s.trim()).filter(Boolean);
        };

        // Create project
        const project = await Project.create({
            title,
            category,
            description,
            images: imageUrls,
            status: status || 'Active',
            challenges: splitField(challenges),
            solutions: splitField(solutions),
            outcomes: splitField(outcomes)
        });
        res.status(201).json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get all projects
exports.getProjects = async (req, res) => {
    try {
        console.log('Fetching all projects...');
        const { category, search } = req.query;
        let query = {};

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Search in title and description
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const projects = await Project.find(query)
            .sort('-createdAt');

        console.log(`Found ${projects.length} projects`);
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get single project
exports.getProject = async (req, res) => {
    try {
        console.log('Fetching project:', req.params.id);
        const project = await Project.findById(req.params.id);

        if (!project) {
            console.log('Project not found');
            return res.status(404).json({
                success: false,
                error: 'Project not found'
            });
        }

        console.log('Project found:', project.title);
        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        const {
            title,
            category,
            description,
            status,
            challenges,
            solutions,
            outcomes,
            keepExistingImages
        } = req.body;
        const role = req.body.role || req.headers['x-user-role'];
        if (role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Only admins can update projects'
            });
        }

        // Get existing project to preserve images if needed
        const existingProject = await Project.findById(req.params.id);
        let imageUrls = [];
        
        // If keeping existing images, start with those
        if (keepExistingImages === 'true' && existingProject.images) {
            imageUrls = [...existingProject.images];
        }

        // Remove images marked for deletion
        if (req.body.imagesToDelete) {
            try {
                const imagesToDelete = JSON.parse(req.body.imagesToDelete);
                imageUrls = imageUrls.filter(imageUrl => !imagesToDelete.includes(imageUrl));
            } catch (error) {
                console.error('Error parsing imagesToDelete:', error);
            }
        }
        
        // Add new uploaded images
        if (req.files && req.files.length > 0) {
            const newImageUrls = req.files.map(file => 
                `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
            );
            imageUrls = [...imageUrls, ...newImageUrls];
        }

        // utility to split
        const splitField = (field) => {
            if (!field) return [];
            if (Array.isArray(field)) return field;
            return String(field).split(',').map(s => s.trim()).filter(Boolean);
        };

        const updateFields = {
            title,
            category,
            description,
            images: imageUrls,
            status,
            challenges: splitField(challenges),
            solutions: splitField(solutions),
            outcomes: splitField(outcomes)
        };
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true, runValidators: true }
        );
        res.status(200).json({
            success: true,
            data: updatedProject
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        console.log('Deleting project:', req.params.id);

        // Temporary admin check: allow if role is admin in body or header
        const role = req.body.role || req.headers['x-user-role'];
        if (role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Only admins can delete projects'
            });
        }

        const project = await Project.findById(req.params.id);

        if (!project) {
            console.log('Project not found');
            return res.status(404).json({
                success: false,
                error: 'Project not found'
            });
        }

        await Project.findByIdAndDelete(req.params.id);
        console.log('Project deleted successfully');
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}; 