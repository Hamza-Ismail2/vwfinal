const Contact = require('../models/Contact');
const { sendContactEmails } = require('../services/emailService');
const sendLeadToSalesforce = require('../services/salesforceWebToLead');

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

        // Ensure service is valid; fallback to 'Other'
        const allowedServices = [
            'Executive Transport', 'Scenic Tours', 'Medical Emergency', 'Cargo & Utility', 'Wedding & Events', 'Film & Photography', 'Custom Charter', 'Aircraft Maintenance', 'Helicopter Services', 'Training', 'Other'
        ];
        if (!allowedServices.includes(req.body.service)) {
            req.body.service = 'Other';
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

        /* ------------------------------------------------------
           Salesforce Web-to-Lead forward                       
           Determine leadSource from payload; default to 'contact'.
        ------------------------------------------------------ */
        try {
            const leadSource = (req.body.leadSource || 'contact').toLowerCase();

            // Split full name into first / last (fallbacks)
            const [firstName, ...rest] = (req.body.name || '').trim().split(' ');
            const lastName = rest.length ? rest.join(' ') : 'Unknown';

            const sfPayload = {
                lead_source: leadSource,
                first_name: firstName,
                last_name: lastName,
                email: req.body.email,
                phone: req.body.phone,
                company: req.body.company || 'Individual',
                description: req.body.message,
            };

            if (leadSource === 'quote') {
                sfPayload['00NPY00000CKHAf'] = req.body.service; // Quote service type
                if (req.body.date) sfPayload['00NPY00000CKKLR'] = req.body.date;
                if (req.body.passengers) sfPayload['00NPY00000CK7b8'] = `${req.body.passengers} ${req.body.passengers === '1' ? 'Passenger' : 'Passengers'}`;
                if (req.body.message) sfPayload['00NPY00000CK7eM'] = req.body.message;
            } else {
                sfPayload['00NPY00000CKNb4'] = req.body.service; // Contact service type
                sfPayload['00NPY00000CKPGH'] = req.body.urgency || 'Normal';
            }

            await sendLeadToSalesforce(sfPayload);
        } catch (sfErr) {
            console.error('Failed to send lead to Salesforce (contact):', sfErr.message);
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

// Mark as read/unread
exports.markRead = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { read: req.body.read },
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update status
exports.updateStatus = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );
        if (!contact) {
            return res.status(404).json({ success: false, error: 'Contact not found' });
        }
        res.status(200).json({ success: true, data: contact });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
}; 