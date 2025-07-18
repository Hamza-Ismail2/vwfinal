# Salesforce OAuth 2.0 Integration Setup

This document explains how to set up the Salesforce OAuth 2.0 password grant flow integration for the helicopter services website.

## Environment Variables Required

Add the following variables to your `.env` file:

```env
# Salesforce OAuth 2.0 Configuration
# Username for Salesforce login (email address)
SF_USERNAME=your-salesforce-username@example.com

# Password for Salesforce login (no security token required)
SF_PASSWORD=your-salesforce-password

# Client ID from Salesforce Connected App
SF_CLIENT_ID=your-salesforce-client-id

# Client Secret from Salesforce Connected App
SF_CLIENT_SECRET=your-salesforce-client-secret

# Optional: Salesforce Login URL (defaults to production)
# Use https://test.salesforce.com for sandbox
# SALESFORCE_LOGIN_URL=https://login.salesforce.com
```

## Salesforce Setup Steps

1. **Create a Connected App in Salesforce:**
   - Go to Setup → App Manager → New Connected App
   - Enable OAuth Settings
   - Set Callback URL to: `https://login.salesforce.com/services/oauth2/success`
   - Select OAuth Scopes: `Access and manage your data (api)`
   - Save and note the Consumer Key (Client ID) and Consumer Secret (Client Secret)

2. **User Permissions:**
   - Ensure your Salesforce user has API access enabled
   - The user should have permissions to create Lead records
   - No security token is required for OAuth 2.0 password grant flow

## API Endpoints

### POST /api/salesforce/create-lead
Creates a new lead in Salesforce from contact form data.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "description": "Interested in helicopter services"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead created successfully in Salesforce",
  "data": {
    "leadId": "00Q1234567890ABC",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "company": "Acme Corp"
  }
}
```

### GET /api/salesforce/health
Checks if the Salesforce connection is working properly.

**Response:**
```json
{
  "success": true,
  "message": "Salesforce connection is healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Features

- **OAuth 2.0 Password Grant Flow:** Secure authentication with Salesforce
- **Token Caching:** Access tokens are cached and reused until expiry
- **Error Handling:** Comprehensive error handling for authentication and API failures
- **Input Validation:** Request data is validated before processing
- **Health Check:** Endpoint to verify Salesforce connectivity

## Error Handling

The API includes comprehensive error handling for:
- Missing environment variables
- Invalid OAuth credentials
- Salesforce API errors
- Network connectivity issues
- Input validation failures

All errors return appropriate HTTP status codes and descriptive error messages. 