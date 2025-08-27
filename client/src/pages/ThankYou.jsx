import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative text-white text-center px-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/HI_KOH-COAST_407_001-SHIBSTY-1-scaled.jpg')`
        }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <img src="/whitebglogo.jpg" alt="Vertical Worx Logo" className="h-24 w-auto mb-8 drop-shadow-lg" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200">
          Your submission has been received. Our team will review your request and get back to you shortly.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou; 