import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
              className="text-9xl md:text-[12rem] font-bold text-orange-500 mb-4"
            >
              404
            </motion.div>

            {/* Main Message */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
            >
              Page Not Found
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, we're here to help you get back on track.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link
                to="/"
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <HomeIcon className="w-5 h-5" />
                <span>Go Home</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Go Back</span>
              </button>
            </motion.div>

            {/* Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Need Help?
              </h2>
              <p className="text-gray-600 mb-6">
                If you're looking for something specific, our team is here to help.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href="tel:+18089309826"
                  className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
                >
                  <PhoneIcon className="w-5 h-5" />
                  <span>Call Us</span>
                </a>
                
                <a
                  href="mailto:info@verticalworx.aero"
                  className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  <span>Email Us</span>
                </a>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Or explore our main services:
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  <Link to="/services" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                    Services
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link to="/gallery" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                    Gallery
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link to="/projects-case-studies" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                    Projects
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link to="/contact" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                    Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 