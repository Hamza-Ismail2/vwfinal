const express = require('express');
const router = express.Router();
const {
    createService,
    getServices,
    getService,
    updateService,
    deleteService
} = require('../controllers/serviceController');

// GET /api/services - Get all services
router.route('/')
    .post(createService)
    .get(getServices);

// GET /api/services/:id - Get specific service
router.route('/:id')
    .get(getService)
    .put(updateService)
    .delete(deleteService);

// GET /api/services/featured - Get featured services
router.get('/featured/list', async (req, res) => {
  try {
    const featuredServices = await require('../models/Service').find({
      is_active: true
    }).sort({ created_at: -1 }).limit(3);

    res.json({
      success: true,
      data: featuredServices
    });

  } catch (error) {
    console.error('Error fetching featured services:', error);
    res.status(500).json({
      error: 'Failed to fetch featured services',
      message: 'Please try again later'
    });
  }
});

module.exports = router;
