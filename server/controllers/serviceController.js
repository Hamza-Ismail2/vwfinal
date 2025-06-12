const Service = require('../models/Service');

// Create a new service
exports.createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get all services
exports.getServices = async (req, res) => {
    try {
        const { category } = req.query;
        let query = { isActive: true };
        
        if (category) {
            query.category = category;
        }

        const services = await Service.find(query).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get single service
exports.getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service not found'
            });
        }
        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update service
exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service not found'
            });
        }
        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Delete service (soft delete)
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );
        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}; 