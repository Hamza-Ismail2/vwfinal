import React, { useState } from 'react';
import { motion } from 'framer-motion';
import contactBackground from '../images/Horseback_blueSky.jpg';
import officeImage from '../images/IMG_7097-scaled-1-1462x2048.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    date: '',
    passengers: '1'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Utility for input sanitization
  const sanitizeInput = (value, type = 'text') => {
    if (typeof value !== 'string') return '';
    let v = value;
    if (type === 'email') {
      v = v.trim().replace(/[^a-zA-Z0-9@._+-]/g, '');
    } else if (type === 'phone') {
      v = v.replace(/[^0-9]/g, ''); // Only allow numbers for phone
    } else if (type === 'number') {
      v = v.replace(/[^0-9]/g, '');
    } else if (type === 'message') {
      v = v.replace(/[<>]/g, ''); // Remove angle brackets but preserve all spaces
    } else {
      v = v.trim().replace(/[<>]/g, ''); // Remove angle brackets to prevent HTML injection
    }
    return v;
  };

  // Format phone as XXX-XXXXXXX
  const formatPhone = (value) => {
    const numbers = value.replace(/[^0-9]/g, '');
    if (numbers.length <= 3) return numbers;
    return numbers.slice(0, 3) + '-' + numbers.slice(3, 10);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let sanitized = value;
    if (name === 'email') sanitized = sanitizeInput(value, 'email');
    else if (name === 'phone') {
      sanitized = sanitizeInput(value, 'phone');
      sanitized = formatPhone(sanitized);
    }
    else if (name === 'passengers') sanitized = sanitizeInput(value, 'number');
    else if (name === 'message') sanitized = value; // Don't sanitize while typing
    else sanitized = sanitizeInput(value, 'text');
    setFormData(prev => ({ ...prev, [name]: sanitized }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const sanitizedData = {
      name: sanitizeInput(formData.name, 'text'),
      email: sanitizeInput(formData.email, 'email'),
      phone: sanitizeInput(formData.phone, 'phone').slice(0, 3) + '-' + sanitizeInput(formData.phone, 'phone').slice(3, 10),
      service: sanitizeInput(formData.service, 'text'),
      message: sanitizeInput(formData.message, 'message'),
      date: sanitizeInput(formData.date, 'text'),
      passengers: sanitizeInput(formData.passengers, 'number'),
    };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          date: '',
          passengers: '1'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: "📞",
      title: "Call Us 24/7",
      content: "(808) 930-9826",
      description: "Emergency hotline available around the clock",
      color: "from-green-500 to-green-700",
      action: "tel:+18089309826"
    },
    {
      icon: "✉️",
      title: "Email Us",
      content: "info@verticalworx.aero",
      description: "We'll respond within 2 hours",
      color: "from-blue-500 to-blue-700",
      action: "mailto:info@verticalworx.aero"
    },
    {
      icon: "📍",
      title: "Visit Our Base",
      content: "73 Uu Street, Kailua-Kona, HI 96740",
      description: "Tour our facility and fleet",
      color: "from-orange-500 to-orange-700"
    }
  ];

  const services = [
    "Executive Transport",
    "Scenic Tours", 
    "Medical Emergency",
    "Cargo & Utility",
    "Wedding & Events",
    "Film & Photography",
    "Custom Charter"
  ];

  return (
    <section id="contact-section" className="relative py-20 min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={contactBackground}
          alt="Beautiful landscape view"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Contact <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Ready to take to the skies? Get in touch with our team for personalized service 
            and immediate assistance with all your helicopter needs.
          </p>
        </motion.div>

        {/* Quick Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => {
              const Component = method.action ? motion.a : motion.div;
              const props = method.action ? { href: method.action } : {};
              
              return (
                                  <Component
                    key={index}
                    {...props}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="group bg-white rounded-2xl shadow-lg p-6 lg:p-10 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col justify-center"
                  >
                    <div className={`w-18 h-18 lg:w-20 lg:h-20 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-3xl lg:text-4xl">{method.icon}</span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3 text-center">
                      {method.title}
                    </h3>
                    <p className="text-blue-600 font-semibold text-center mb-3 text-base lg:text-lg">
                      {method.content}
                    </p>
                    <p className="text-gray-600 text-sm lg:text-base text-center leading-relaxed">
                      {method.description}
                    </p>
                  </Component>
              );
            })}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Request a Quote
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                      placeholder="XXX-XXXXXXX"
                      maxLength={11}
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Service Type *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Number of Passengers
                    </label>
                    <select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white resize-none"
                    placeholder="Tell us about your specific requirements, pickup/drop-off locations, or any special requests..."
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  data-track-click="contact_send_quote_button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-lg transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending Request...
                    </div>
                  ) : (
                    'Send Quote Request'
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-green-100 border border-green-300 rounded-lg text-green-700"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Thank you! Your request has been sent successfully. We'll contact you within 2 hours.
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      There was an error sending your request. Please try again or call us directly.
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Company Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Company Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Visit Our Facility
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Our Location</h4>
                    <p className="text-gray-600">
                      73 Uu Street<br />
                      Kailua-Kona, HI 96740<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h4>
                    <p className="text-gray-600">
                      <strong>Operations:</strong> 24/7<br />
                      <strong>Office:</strong> 6:00 AM - 10:00 PM<br />
                      <strong>Emergency:</strong> Always Available
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Certifications</h4>
                    <p className="text-gray-600">
                      FAA Part 135 Certified<br />
                      DOT Safety Approved<br />
                      Insurance: $5M Coverage
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Find Us</h3>
              <div className="relative rounded-lg overflow-hidden h-64 mb-4">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-156.0514%2C19.7191%2C-156.0314%2C19.7391&layer=mapnik&marker=19.729143754036354%2C-156.04140276501104"
                  className="w-full h-full border-0"
                  title="Vertical Worx Location - 73 Uu Street, Kailua-Kona, Hawaii"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p className="font-semibold">73 Uu Street, Kailua-Kona, HI 96740</p>
                  <p>Click map to open in new window</p>
                </div>
                <a
                  href="https://www.openstreetmap.org/?mlat=19.729143754036354&mlon=-156.04140276501104#map=16/19.729143754036354/-156.04140276501104"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300"
                >
                  View Larger Map
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    How far in advance should I book?
                  </h4>
                  <p className="text-gray-600">
                    For scheduled flights, we recommend booking at least 48 hours in advance. Emergency services are available immediately.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    What's included in the price?
                  </h4>
                  <p className="text-gray-600">
                    All flights include pilot, fuel, insurance, safety equipment, and pre-flight briefing. Additional services can be added.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    What about weather conditions?
                  </h4>
                  <p className="text-gray-600">
                    Safety is our priority. We monitor weather continuously and will reschedule if conditions are not suitable for safe flight.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Do you provide pickup services?
                  </h4>
                  <p className="text-gray-600">
                    Yes! We offer pickup from approved helipads, private properties, and designated landing areas throughout the region.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    What are your payment options?
                  </h4>
                  <p className="text-gray-600">
                    We accept all major credit cards, bank transfers, and corporate accounts. Payment can be made in advance or after service.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Are flights insured?
                  </h4>
                  <p className="text-gray-600">
                    All flights are fully insured with $5M coverage. Additional insurance can be arranged for special requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 