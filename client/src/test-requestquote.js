// Simple test to verify RequestQuote component can be imported
import React from 'react';
import RequestQuote from './pages/RequestQuote';

console.log('RequestQuote component imported successfully:', RequestQuote);

// Test if component can be instantiated
try {
  const element = React.createElement(RequestQuote);
  console.log('RequestQuote component can be instantiated:', element);
} catch (error) {
  console.error('Error instantiating RequestQuote:', error);
} 