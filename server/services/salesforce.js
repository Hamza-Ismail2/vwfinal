const jsforce = require('jsforce');
require('dotenv').config();

class SalesforceService {
  constructor() {
    this.conn = new jsforce.Connection({
      loginUrl: process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com'
    });
    this.isConnected = false;
  }

  async connect() {
    if (this.isConnected) {
      return this.conn;
    }

    try {
      // Use OAuth2 if client credentials are provided
      if (process.env.SALESFORCE_CLIENT_ID && process.env.SALESFORCE_CLIENT_SECRET) {
        await this.conn.login(
          process.env.SALESFORCE_USERNAME,
          process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_SECURITY_TOKEN
        );
      } else {
        // Fallback to username/password login
        await this.conn.login(
          process.env.SALESFORCE_USERNAME,
          process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_SECURITY_TOKEN
        );
      }

      this.isConnected = true;
      console.log('✅ Connected to Salesforce');
      return this.conn;
    } catch (error) {
      console.error('🚨 Salesforce connection error:', error);
      throw new Error('Failed to connect to Salesforce: ' + error.message);
    }
  }

  async createLead(contactData) {
    try {
      await this.connect();

      const leadData = {
        FirstName: contactData.first_name,
        LastName: contactData.last_name,
        Email: contactData.email,
        Phone: contactData.phone_number,
        Company: 'Helicopter Services Inquiry',
        LeadSource: 'Website',
        Status: 'Open - Not Contacted',
        Description: contactData.message || 'Contact form submission',
        Industry: 'Aviation Services',
        HasOptedOutOfEmail: !contactData.contact_consent
      };

      const result = await this.conn.sobject('Lead').create(leadData);
      
      if (result.success) {
        console.log('✅ Lead created in Salesforce:', result.id);
        return result.id;
      } else {
        console.error('🚨 Failed to create lead:', result.errors);
        throw new Error('Failed to create lead in Salesforce');
      }
    } catch (error) {
      console.error('🚨 Salesforce lead creation error:', error);
      throw error;
    }
  }

  async createAccount(contactData) {
    try {
      await this.connect();

      const accountData = {
        Name: `${contactData.first_name} ${contactData.last_name}`,
        Type: 'Customer',
        Industry: 'Aviation Services',
        Phone: contactData.phone_number,
        Description: 'Helicopter services customer',
        BillingCity: 'TBD',
        BillingCountry: 'United States'
      };

      const result = await this.conn.sobject('Account').create(accountData);
      
      if (result.success) {
        console.log('✅ Account created in Salesforce:', result.id);
        
        // Create associated contact
        const contactSFData = {
          FirstName: contactData.first_name,
          LastName: contactData.last_name,
          Email: contactData.email,
          Phone: contactData.phone_number,
          AccountId: result.id,
          Description: contactData.message || 'Website contact form submission',
          HasOptedOutOfEmail: !contactData.contact_consent
        };

        const contactResult = await this.conn.sobject('Contact').create(contactSFData);
        
        if (contactResult.success) {
          console.log('✅ Contact created in Salesforce:', contactResult.id);
        }

        return result.id;
      } else {
        console.error('🚨 Failed to create account:', result.errors);
        throw new Error('Failed to create account in Salesforce');
      }
    } catch (error) {
      console.error('🚨 Salesforce account creation error:', error);
      throw error;
    }
  }

  async createOpportunity(contactData, serviceData) {
    try {
      await this.connect();

      // First create an account
      const accountId = await this.createAccount(contactData);

      const opportunityData = {
        Name: `Helicopter Service - ${contactData.first_name} ${contactData.last_name}`,
        AccountId: accountId,
        StageName: 'Prospecting',
        CloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
        Type: 'New Customer',
        LeadSource: 'Website',
        Description: `Service: ${serviceData?.name || 'General Inquiry'}\nMessage: ${contactData.message || 'No message provided'}`,
        Amount: this.extractPriceFromRange(serviceData?.price_range)
      };

      const result = await this.conn.sobject('Opportunity').create(opportunityData);
      
      if (result.success) {
        console.log('✅ Opportunity created in Salesforce:', result.id);
        return result.id;
      } else {
        console.error('🚨 Failed to create opportunity:', result.errors);
        throw new Error('Failed to create opportunity in Salesforce');
      }
    } catch (error) {
      console.error('🚨 Salesforce opportunity creation error:', error);
      throw error;
    }
  }

  extractPriceFromRange(priceRange) {
    if (!priceRange) return null;
    
    // Extract first number from price range like "$300 - $500"
    const match = priceRange.match(/\$(\d+)/);
    return match ? parseInt(match[1]) : null;
  }

  async getLeads(limit = 10) {
    try {
      await this.connect();
      
      const result = await this.conn.query(`
        SELECT Id, FirstName, LastName, Email, Phone, Company, Status, CreatedDate 
        FROM Lead 
        WHERE Company = 'Helicopter Services Inquiry'
        ORDER BY CreatedDate DESC 
        LIMIT ${limit}
      `);
      
      return result.records;
    } catch (error) {
      console.error('🚨 Error fetching leads:', error);
      throw error;
    }
  }

  async updateLeadStatus(leadId, status) {
    try {
      await this.connect();
      
      const result = await this.conn.sobject('Lead').update({
        Id: leadId,
        Status: status
      });
      
      if (result.success) {
        console.log('✅ Lead status updated:', leadId);
        return true;
      } else {
        console.error('🚨 Failed to update lead status:', result.errors);
        return false;
      }
    } catch (error) {
      console.error('🚨 Error updating lead status:', error);
      throw error;
    }
  }
}

module.exports = new SalesforceService(); 