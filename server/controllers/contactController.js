const Contact = require('../models/Contact');
const { sendContactEmails } = require('../services/emailService');

// Create a new contact submission
exports.createContact = async (req, res) => {
    try {
        console.log('Received contact form submission:', req.body);
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'message', 'service'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            console.log('Missing required fields:', missingFields);
            return res.status(400).json({
                success: false,
                error: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        console.log('Creating new contact in database...');
        const contact = await Contact.create(req.body);
        console.log('Contact created successfully with ID:', contact._id);
        
        // Send emails
        try {
            console.log('Attempting to send emails...');
            await sendContactEmails(req.body);
            console.log('Emails sent successfully');
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Log the error but don't fail the request
            return res.status(201).json({
                success: true,
                data: contact,
                message: 'Contact form submitted successfully, but email sending failed. Please try again later.',
                emailError: process.env.NODE_ENV === 'development' ? emailError.message : undefined
            });
        }

        console.log('Sending success response...');
        res.status(201).json({
            success: true,
            data: contact,
            message: 'Contact form submitted successfully. A confirmation email has been sent.'
        });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get all contact submissions
exports.getContacts = async (req, res) => {
    try {
        console.log('Fetching all contacts...');
        const contacts = await Contact.find().sort({ createdAt: -1 });
        console.log(`Found ${contacts.length} contacts`);
        
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get single contact submission
exports.getContact = async (req, res) => {
    try {
        console.log('Fetching contact with ID:', req.params.id);
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            console.log('Contact not found');
            return res.status(404).json({
                success: false,
                error: 'Contact submission not found'
            });
        }
        
        console.log('Contact found:', contact._id);
        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update contact submission status
exports.updateContact = async (req, res) => {
    try {
        console.log('Updating contact with ID:', req.params.id);
        console.log('Update data:', req.body);
        
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        
        if (!contact) {
            console.log('Contact not found for update');
            return res.status(404).json({
                success: false,
                error: 'Contact submission not found'
            });
        }
        
        console.log('Contact updated successfully:', contact._id);
        res.status(200).json({
            success: true,
            data: contact
        });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Delete contact submission
exports.deleteContact = async (req, res) => {
    try {
        console.log('Deleting contact with ID:', req.params.id);
        const contact = await Contact.findByIdAndDelete(req.params.id);
        
        if (!contact) {
            console.log('Contact not found for deletion');
            return res.status(404).json({
                success: false,
                error: 'Contact submission not found'
            });
        }
        
        console.log('Contact deleted successfully:', req.params.id);
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}; 