const router = require('express').Router();
const Event = require('../models/Event');

// POST /api/events  – log a client-side event
router.post('/', async (req, res) => {
  try {
    const { name, params } = req.body || {};
    if (!name) return res.status(400).json({ error: 'Missing event name' });
    await Event.create({ name, params });
    res.sendStatus(204);
  } catch (err) {
    console.error('Failed to log event', err);
    res.status(500).json({ error: 'Failed to log event' });
  }
});

// GET /api/events – latest 100 events (newest first)
router.get('/', async (_req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }).limit(100);
    res.json(events);
  } catch (err) {
    console.error('Failed to fetch events', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports = router; 