import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-20 section-padding"
    >
      <div className="container-width py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="hero-text gradient-text mb-6">
            Contact Us
          </h1>
          <p className="subtitle-text max-w-3xl mx-auto">
            Ready to take flight? Get in touch with us to book your helicopter experience 
            or learn more about our premium services.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage; 