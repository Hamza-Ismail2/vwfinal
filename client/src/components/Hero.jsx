import React, { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  const handleContactUsClick = () => {
    const contactSection = document.querySelector('#contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-32 lg:pt-36">
      {/* ————— Background looping video ————— */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/videos/parked-helicopter1.mp4" // place file in client/public/videos
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4 sm:px-6 max-w-6xl mx-auto py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-4 sm:mb-6"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
            <span className="text-white">When it's done right,</span><br />
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">it just WORX.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-4 sm:mb-6"
        >
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-2 sm:mb-3">
            Precision Aviation Services Across
          </h2>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Hawaiian Islands
          </h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed"
        >
          Locally owned and veteran-operated, Vertical Worx delivers comprehensive 
          Helicopter Services with unmatched professionalism and safety.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-lg mx-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/services')}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[180px]"
          >
            Our Services
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContactUsClick}
            className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-orange-500 transition-all duration-300 min-w-[180px]"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;