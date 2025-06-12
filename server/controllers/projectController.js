const Project = require('../models/Project');

// Create new project
exports.createProject = async (req, res) => {
    try {
        const {
            title,
            category,
            description,
            challenges,
            solutions,
            outcomes
        } = req.body;
        // Create project
        const project = await Project.create({
            title,
            category,
            description,
            challenges: Array.isArray(challenges) ? challenges : [challenges],
            solutions: Array.isArray(solutions) ? solutions : [solutions],
            outcomes: Array.isArray(outcomes) ? outcomes : [outcomes]
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
            challenges,
            solutions,
            outcomes
        } = req.body;
        const role = req.body.role || req.headers['x-user-role'];
        if (role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Only admins can update projects'
            });
        }
        let updateFields = {
            title,
            category,
            description,
            challenges: Array.isArray(challenges) ? challenges : [challenges],
            solutions: Array.isArray(solutions) ? solutions : [solutions],
            outcomes: Array.isArray(outcomes) ? outcomes : [outcomes]
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