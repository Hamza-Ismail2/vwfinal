const axios = require('axios');
require('dotenv').config();

// Test configuration
const BASE_URL = 'http://localhost:5000/api/salesforce';

// Test data for creating a lead
const testLeadData = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test.user@example.com',
  phone: '+1234567890',
  company: 'Test Company',
  description: 'This is a test lead from the API'
};

async function testSalesforceHealth() {
  try {
    console.log('Testing Salesforce health check...');
    const response = await axios.get(`${BASE_URL}/health`);
    console.log('Health check passed:', response.data);
    return true;
  } catch (error) {
    if (error.response) {
      console.error('Health check failed:');
      console.error('  Status:', error.response.status);
      console.error('  Headers:', JSON.stringify(error.response.headers, null, 2));
      console.error('  Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('Health check failed: No response received');
      console.error(error.request);
    } else {
      console.error('Health check failed:', error.message);
    }
    return false;
  }
}

async function testCreateLead() {
  try {
    console.log('Testing lead creation...');
    const response = await axios.post(`${BASE_URL}/create-lead`, testLeadData);
    console.log('Lead created successfully:', response.data);
    return true;
  } catch (error) {
    if (error.response) {
      console.error('Lead creation failed:');
      console.error('  Status:', error.response.status);
      console.error('  Headers:', JSON.stringify(error.response.headers, null, 2));
      console.error('  Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('Lead creation failed: No response received');
      console.error(error.request);
    } else {
      console.error('Lead creation failed:', error.message);
    }
    return false;
  }
}

async function runTests() {
  console.log('Starting Salesforce API tests...\n');
  
  // Check if required environment variables are set
  const requiredVars = ['SF_USERNAME', 'SF_PASSWORD', 'SF_CLIENT_ID', 'SF_CLIENT_SECRET'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    console.log('Please set these variables in your .env file');
    return;
  }
  
  console.log('All required environment variables are set\n');
  
  // Test health endpoint
  const healthOk = await testSalesforceHealth();
  console.log('');
  
  if (healthOk) {
    // Test lead creation
    await testCreateLead();
  } else {
    console.log('Skipping lead creation test due to health check failure');
  }
  
  console.log('\nTests completed');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testSalesforceHealth, testCreateLead }; 