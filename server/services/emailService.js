const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Verify transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Email templates
const emailTemplates = {
    // Template for company notification
    companyNotification: (contactData) => ({
        subject: 'New Contact Form Submission - VerticalWorx',
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
            <p><strong>Service:</strong> ${contactData.service}</p>
            <p><strong>Message:</strong></p>
            <p>${contactData.message}</p>
            <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
        `
    }),

    // Template for user confirmation
    userConfirmation: (contactData) => ({
        subject: 'Thank you for contacting VerticalWorx',
        html: `
            <h2>Thank you for contacting VerticalWorx</h2>
            <p>Dear ${contactData.name},</p>
            <p>We have received your message and will get back to you shortly.</p>
            <p>Here's a copy of your message:</p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p><strong>Service:</strong> ${contactData.service}</p>
                <p><strong>Message:</strong></p>
                <p>${contactData.message}</p>
            </div>
            <p>If you have any additional questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>VerticalWorx Team</p>
        `
    })
};

// Function to send emails
const sendEmail = async (to, template, data) => {
    try {
        console.log('Attempting to send email to:', to);
        console.log('Using email template:', template.subject);

        const mailOptions = {
            from: `"VerticalWorx" <${process.env.EMAIL_USER}>`,
            to,
            subject: template.subject,
            html: template.html
        };

        console.log('Mail options configured:', {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
        });

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// Function to send both company notification and user confirmation
const sendContactEmails = async (contactData) => {
    try {
        console.log('Starting to send contact emails for:', contactData.email);
        
        // Send notification to company
        console.log('Sending notification to company email:', process.env.NOTIFICATION_EMAIL);
        await sendEmail(
            process.env.NOTIFICATION_EMAIL,
            emailTemplates.companyNotification(contactData),
            contactData
        );

        // Send confirmation to the user who submitted the form
        console.log('Sending confirmation to user:', contactData.email);
        await sendEmail(
            contactData.email,
            emailTemplates.userConfirmation(contactData),
            contactData
        );

        console.log('All emails sent successfully');
        return true;
    } catch (error) {
        console.error('Error in sendContactEmails:', error);
        throw error;
    }
};

module.exports = {
    sendContactEmails
}; 