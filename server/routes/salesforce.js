const express = require('express');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const router = express.Router();

// Validation middleware for lead creation
const validateLeadData = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('description').optional().trim()
];

// OAuth 2.0 token cache
let accessToken = null;
let tokenExpiry = null;

// Get OAuth 2.0 access token using password grant flow
async function getAccessToken() {
  // Check if we have a valid cached token
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    // Append SECURITY_TOKEN to password if provided
    const sfPassword = (process.env.SF_PASSWORD || '') + (process.env.SECURITY_TOKEN || '');

    const tokenResponse = await axios.post('https://login.salesforce.com/services/oauth2/token', 
      new URLSearchParams({
        grant_type: 'password',
        username: process.env.SF_USERNAME,
        password: sfPassword,
        client_id: process.env.SF_CLIENT_ID,
        client_secret: process.env.SF_CLIENT_SECRET
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    accessToken = tokenResponse.data.access_token;
    // Set token expiry to 1 hour from now (subtract 5 minutes for safety)
    tokenExpiry = Date.now() + (tokenResponse.data.expires_in - 300) * 1000;

    console.log('✅ Successfully obtained Salesforce access token');
    return accessToken;
  } catch (error) {
    console.error('🚨 Failed to obtain Salesforce access token:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with Salesforce');
  }
}

// Create lead in Salesforce
async function createSalesforceLead(leadData) {
  try {
    const token = await getAccessToken();
    
    const response = await axios.post(
      'https://nosoftware-app-119.lightning.force.com/services/data/v58.0/sobjects/Lead/',
      {
        FirstName: leadData.firstName,
        LastName: leadData.lastName,
        Email: leadData.email,
        Phone: leadData.phone,
        Company: leadData.company,
        Description: leadData.description || 'Contact form submission from website',
        LeadSource: 'Website',
        Status: 'Open - Not Contacted',
        Industry: 'Aviation Services'
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Lead created successfully in Salesforce:', response.data.id);
    return response.data.id;
  } catch (error) {
    console.error('🚨 Failed to create lead in Salesforce:', error.response?.data || error.message);
    
    // Handle specific Salesforce errors
    if (error.response?.data?.errors) {
      const salesforceErrors = error.response.data.errors.map(err => err.message).join(', ');
      throw new Error(`Salesforce error: ${salesforceErrors}`);
    }
    
    throw new Error('Failed to create lead in Salesforce');
  }
}

// POST /api/create-lead - Create a new lead in Salesforce
router.post('/create-lead', validateLeadData, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Check if required environment variables are set
    const requiredEnvVars = ['SF_USERNAME', 'SF_PASSWORD', 'SF_CLIENT_ID', 'SF_CLIENT_SECRET'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('🚨 Missing required environment variables:', missingVars);
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: Missing Salesforce credentials'
      });
    }

    // Extract lead data from request body
    const leadData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      company: req.body.company,
      description: req.body.description
    };

    // Create lead in Salesforce
    const leadId = await createSalesforceLead(leadData);

    res.status(201).json({
      success: true,
      message: 'Lead created successfully in Salesforce',
      data: {
        leadId: leadId,
        firstName: leadData.firstName,
        lastName: leadData.lastName,
        email: leadData.email,
        company: leadData.company
      }
    });

  } catch (error) {
    console.error('🚨 Error in create-lead route:', error);
    
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create lead',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// GET /api/salesforce/health - Check Salesforce connection
router.get('/health', async (req, res) => {
  try {
    // Check if required environment variables are set
    const requiredEnvVars = ['SF_USERNAME', 'SF_PASSWORD', 'SF_CLIENT_ID', 'SF_CLIENT_SECRET'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      return res.status(500).json({
        success: false,
        message: 'Salesforce configuration incomplete',
        missingVariables: missingVars
      });
    }

    // Try to get an access token
    await getAccessToken();

    res.status(200).json({
      success: true,
      message: 'Salesforce connection is healthy',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('🚨 Salesforce health check failed:', error);
    
    res.status(500).json({
      success: false,
      message: 'Salesforce connection failed',
      error: error.message
    });
  }
});

module.exports = router; 