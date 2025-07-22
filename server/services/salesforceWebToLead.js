const fetch = require('node-fetch');
const ORGANIZATION_ID = process.env.SF_ORG_ID || '00DHr0000077ygs';

/**
 * Send a lead to Salesforce Web-to-Lead endpoint.
 * Expects already-mapped field object (keys matching SF field names / IDs).
 * @param {Object} fields key-value pairs for SF.
 * @returns {Promise<void>}
 */
async function sendLeadToSalesforce(fields) {
  try {
    const params = new URLSearchParams();
    params.append('oid', ORGANIZATION_ID);
    params.append('retURL', 'https://bytes-test-5.com/thank-you');

    for (const [k, v] of Object.entries(fields)) {
      if (v !== undefined && v !== null && v !== '') {
        params.append(k, v);
      }
    }

    const resp = await fetch(`https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString(),
      redirect: 'follow'
    });

    if (!resp.ok) {
      console.error('Salesforce WebToLead error status', resp.status);
    }
  } catch (err) {
    console.error('Salesforce WebToLead error', err);
  }
}

module.exports = sendLeadToSalesforce; 