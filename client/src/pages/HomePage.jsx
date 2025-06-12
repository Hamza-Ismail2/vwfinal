import React from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-20 section-padding"
    >
      <div className="container-width">
        <div className="text-center py-20">
          <h1 className="hero-text gradient-text mb-6">
            Home Page
          </h1>
          <p className="subtitle-text">
            This is a placeholder for the dedicated home page.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage; 