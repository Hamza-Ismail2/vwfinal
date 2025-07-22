import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white text-center px-4">
      <img src="/whitebglogo.jpg" alt="Vertical Worx Logo" className="h-24 w-auto mb-8 drop-shadow-lg" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg md:text-xl max-w-2xl mb-8">
        Your submission has been received. Our team will review your request and get back to you shortly.
      </p>
      <Link
        to="/"
        className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ThankYou; 