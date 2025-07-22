import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center px-4"
    >
      <div className="max-w-xl w-full">
        <img
          src="/whitebglogo.jpg"
          alt="Vertical Worx Logo"
          className="h-24 w-auto mx-auto mb-8 drop-shadow-lg"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Thank You!
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
          Your message has been successfully submitted. Our team will review it and get back to you shortly.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default ThankYou; 