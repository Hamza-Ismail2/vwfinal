const express = require('express');
const router = express.Router();
const {
  createQuote,
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
  markRead,
  updateStatus
} = require('../controllers/quoteController');

router.route('/')
  .post(createQuote)
  .get(getQuotes);

router.route('/:id')
  .get(getQuote)
  .put(updateQuote)
  .delete(deleteQuote);

router.patch('/:id/read', markRead);
router.patch('/:id/status', updateStatus);

module.exports = router; 