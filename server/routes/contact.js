const express = require('express');
const { body, validationResult } = require('express-validator');
const salesforceService = require('../services/salesforce');


const router = express.Router();
const {
    createContact,
    getContacts,
    getContact,
    updateContact,
    deleteContact,
    markRead,
    updateStatus
} = require('../controllers/contactController');

router.route('/')
    .post(createContact)
    .get(getContacts);

router.route('/:id')
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);

// Mark as read/unread
router.patch('/:id/read', markRead);
// Update status
router.patch('/:id/status', updateStatus);

module.exports = router;


