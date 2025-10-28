import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import helicopterContactBg from '../images/HI_KOH-COAST_407_001-SHIBSTY-1-scaled.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    company: '',
    message: '',
    date: '',
    passengers: '1',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);

  // Salesforce return URL for redirect after successful submission
  const retURL = `${window.location.origin}/thank-you`;

  // Utility for input sanitization
  const sanitizeInput = (value, type = 'text') => {
    if (typeof value !== 'string') return '';
    let v = value;
    if (type === 'email') {
      v = v.trim().replace(/[^a-zA-Z0-9@._+-]/g, '');
    } else if (type === 'phone') {
      v = v.replace(/[^0-9]/g, '');
    } else if (type === 'number') {
      v = v.replace(/[^0-9]/g, '');
    } else if (type === 'message') {
      v = v.replace(/[<>]/g, '');
    } else {
      v = v.trim().replace(/[<>]/g, '');
    }
    return v;
  };

  // Convert date from YYYY-MM-DD to MM/DD/YYYY for Salesforce
  const convertDateForSalesforce = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }
    return dateString;
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
    else if (name === 'message') sanitized = value;
    else sanitized = sanitizeInput(value, 'text');
    setFormData(prev => ({ ...prev, [name]: sanitized }));
  };

  // Dual-submit handler: POST to our backend, wait for it, then submit to Salesforce, then redirect
  const handleDualSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formEl = formRef.current;
    // Extract field values from the form
    const nameVal = sanitizeInput(formEl['fullName'].value, 'text');
    const emailVal = sanitizeInput(formEl['email'].value, 'email');
    const rawPhone = sanitizeInput(formEl['phone'].value, 'phone');
    const phoneFormatted = rawPhone.slice(0, 3) + '-' + rawPhone.slice(3, 10);
    const serviceVal = sanitizeInput(formEl['00NPY00000CKNb4'].value, 'text');
    const messageVal = sanitizeInput(formEl['00NPY00000CK7eM'].value, 'message');
    const rawDateVal = sanitizeInput(formEl['00NPY00000CKKLR'].value, 'text');
    const dateVal = convertDateForSalesforce(rawDateVal); // Convert to MM/DD/YYYY
    const passengersVal = sanitizeInput(formEl['00NPY00000CK7b8'].value, 'number');
    const companyVal = sanitizeInput(formEl['company'].value, 'text');
    // Leave company empty if blank (don't set 'NA')

    // Split full name into first and last names for Salesforce
    let firstName = '';
    let lastName = '';
    const nameParts = nameVal.trim().split(' ');
    if (nameParts.length === 1) {
      firstName = '';
      lastName = nameParts[0] || 'N/A';
    } else {
      firstName = nameParts.shift();
      lastName = nameParts.join(' ') || 'N/A';
    }
    formEl['first_name'].value = firstName;
    formEl['last_name'].value = lastName;
    formEl['phone'].value = phoneFormatted;
    formEl['company'].value = companyVal; // Will be empty string if blank

    // Populate Salesforce custom fields
    formEl['00NPY00000CKNb4'].value = serviceVal; // Service Type
    formEl['00NPY00000CK7b8'].value = passengersVal; // Number of Passengers
    formEl['00NPY00000CK7eM'].value = messageVal; // Additional Details
    formEl['00NPY00000CKKLR'].value = dateVal; // Preferred Date (converted to MM/DD/YYYY)

    const payload = {
      name: nameVal,
      email: emailVal,
      phone: phoneFormatted,
      service: serviceVal,
      message: messageVal,
      date: rawDateVal, // Send raw date format to backend
      passengers: passengersVal,
      company: companyVal,
    };
    
    setIsSubmitting(true);
    
    try {
      // Step 1: Submit to backend and WAIT for it to complete
      console.log('📤 Starting backend API call...');
      const backendResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log('✅ Backend API completed, status:', backendResponse.status);
    } catch (err) {
      console.error('❌ Error posting to backend:', err);
    }

    // Step 2: Submit to Salesforce (will auto-redirect via retURL)
    console.log('📤 Starting Salesforce submission...');
    // Remove event listener to avoid recursion
    formRef.current.removeEventListener('submit', handleDualSubmit);
    formRef.current.submit();
    console.log('✅ Form submitted to Salesforce');
  };

  const services = [
    'Executive Transport',
    'Scenic Tours',
    'Medical Emergency',
    'Cargo & Utility',
    'Wedding & Events',
    'Film & Photography',
    'Custom Charter',
  ];

  const contactMethods = [
    {
      icon: "📧",
      title: "General Inquiries",
              primary: "info@verticalworx.aero",
      secondary: "Response within 2 hours during business hours",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "📞",
      title: "Phone",
      primary: "(808) 930-9826",
      secondary: "Call us during business hours",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: "📋",
      title: "Maintenance Services",
      primary: "maintenance@wvx.aero",
      secondary: "Schedule service and maintenance requests",
      color: "from-green-500 to-green-600"
    },
    {
      icon: "💼",
      title: "Business Development",
      primary: "business@wvx.aero",
      secondary: "Partnerships and corporate services",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const officeLocations = [
    {
      name: "Kailua-Kona Headquarters",
      address: "73 Uu Street\nKailua-Kona, Hawaii 96740",
      phone: "(808) 930-9826",
      hours: "Monday - Friday: 6:00 AM - 10:00 PM\nSaturday - Sunday: 8:00 AM - 6:00 PM",
      services: ["Operations Center", "Maintenance Facility", "Training Center"]
    }
  ];

  const serviceTypes = [
    "VIP Transport",
    "Scenic Tours",
    "Cargo & Utility",
    "Film & Photography",
    "Aircraft Maintenance",
    "Pilot Training",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white min-h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${helicopterContactBg})`
          }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            >
              Contact <span className="text-orange-500">Us</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              Ready to experience precision aviation? Get in touch with our expert team 
              for service inquiries, bookings, and all your helicopter needs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 sm:px-6 py-3 text-white text-sm sm:text-base">
                <span className="text-orange-400 font-semibold">🚁</span> Expert pilots
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 sm:px-6 py-3 text-white text-sm sm:text-base">
                <span className="text-orange-400 font-semibold">⚡</span> 24/7 support
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 sm:px-6 py-3 text-white text-sm sm:text-base">
                <span className="text-orange-400 font-semibold">📞</span> Instant response
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach our team for all your aviation needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-3xl">{method.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {method.title}
                </h3>
                <div className="text-lg font-semibold text-orange-600 mb-2">
                  {method.primary}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {method.secondary}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 w-full max-w-full"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-8">
                Send Us a Message
              </h3>
              {/* --- Salesforce Web-to-Lead form (integrated) --- */}
              <form
                ref={formRef}
                action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DHr0000077ygs"
                method="POST"
                className="space-y-6"
                onSubmit={handleDualSubmit}
              >
                <input type="hidden" name="oid" value="00DHr0000077ygs" />
                <input type="hidden" name="retURL" value={retURL} />
                <input type="hidden" name="lead_source" value="Web" />
                {/* Hidden fields required by Salesforce */}
                <input type="hidden" name="first_name" />
                <input type="hidden" name="last_name" />
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      maxLength="40"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value.replace(/[^a-zA-Z\s]/g, '') }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      maxLength="80"
                      required
                      pattern="[^\s]+"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value.replace(/\s/g, '') }))}
                    />
                  </div>
                </div>
                {/* Optional Company Field */}
                <div>
                  <label htmlFor="company" className="block text-gray-700 font-semibold mb-2">
                    Company (optional)
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    maxLength="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                    placeholder="Company name (if applicable)"
                    value={formData.company}
                    onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                {/* Phone & Service Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      maxLength="40"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                      placeholder="XXX-XXXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="00NPY00000CKNb4" className="block text-gray-700 font-semibold mb-2">
                      Service Type *
                    </label>
                    <select
                      id="00NPY00000CKNb4"
                      name="00NPY00000CKNb4"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white"
                      value={formData.service}
                      onChange={e => setFormData(prev => ({ ...prev, service: e.target.value }))}
                    >
                      <option value="">Select a service</option>
                      {services.map((service, idx) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Preferred Date & Passengers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="00NPY00000CKKLR" className="block text-gray-700 font-semibold mb-2">
                      Preferred Date
                    </label>
                    <input
                      id="00NPY00000CKKLR"
                      name="00NPY00000CKKLR"
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white"
                      value={formData.date}
                      onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="00NPY00000CK7b8" className="block text-gray-700 font-semibold mb-2">
                      Number of Passengers
                    </label>
                    <select
                      id="00NPY00000CK7b8"
                      name="00NPY00000CK7b8"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white"
                      value={formData.passengers}
                      onChange={e => setFormData(prev => ({ ...prev, passengers: e.target.value }))}
                    >
                      <option value="">Select no. of passengers</option>
                      {[...Array(9)].map((_, i) => {
                        const num = i + 1;
                        return (
                          <option key={num} value={`${num} Passenger${num > 1 ? 's' : ''}`}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                {/* Additional Details */}
                <div>
                  <label htmlFor="00NPY00000CK7eM" className="block text-gray-700 font-semibold mb-2">
                    Additional Details
                  </label>
                  <textarea
                    id="00NPY00000CK7eM"
                    name="00NPY00000CK7eM"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 bg-white resize-none"
                    placeholder="Tell us more about your requirements..."
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>
                <button
                  type="submit"
                  data-track-click="contact_send_quote_button"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-lg transform transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
              {/* --- End Salesforce form --- */}
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
            </motion.div>

            {/* Office Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Office Location */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Our Location
                </h3>
                
                {officeLocations.map((location, index) => (
                  <div key={index} className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-3">
                        {location.name}
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <div className="font-medium text-gray-800">Address</div>
                            <div className="text-gray-600 whitespace-pre-line">{location.address}</div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <div>
                            <div className="font-medium text-gray-800">Phone</div>
                            <div className="text-gray-600">{location.phone}</div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <div className="font-medium text-gray-800">Business Hours</div>
                            <div className="text-gray-600 whitespace-pre-line">{location.hours}</div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <div className="font-medium text-gray-800">Services Available</div>
                            <ul className="text-gray-600">
                              {location.services.map((service, sIndex) => (
                                <li key={sIndex} className="flex items-center">
                                  <span className="w-1 h-1 bg-orange-500 rounded-full mr-2"></span>
                                  {service}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-4 sm:p-8 text-white w-full max-w-full overflow-x-auto">
                <h3 className="text-2xl font-bold mb-4">
                  Connect With Us
                </h3>
                <p className="text-orange-100 mb-6">
                  Follow us on social media for updates, aviation insights, and behind-the-scenes content.
                </p>
                
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://www.facebook.com/verticalworx.aero" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                    title="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/vertical.worx" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                    title="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/verticalworxaero" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                    title="LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@vertical.worx" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                    title="TikTok"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://x.com/vertical_worx" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                    title="Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.youtube.com/@VerticalWorx" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-300 hover:scale-110"
                    title="YouTube"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Find Us</h3>
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
        </div>
      </section>
    </div>
  );
};

export default ContactUs; 