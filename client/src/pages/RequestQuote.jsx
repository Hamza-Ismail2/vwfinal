import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import helicopterBg from '../images/Bell-407-Hughes-500-Flight-over-Old-Flow.jpg';

const RequestQuote = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Service Type
    serviceType: '',
    
    // Step 2: Service Details
    aircraft: '',
    passengers: '',
    flightDate: '',
    flightTime: '',
    duration: '',
    origin: '',
    destination: '',
    specialRequests: '',
    
    // Step 3: Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    
    // Step 4: Additional Details
    budget: '',
    flexibility: '',
    additionalInfo: ''
  });

  const serviceTypes = [
    {
      id: 'executive-transport',
      title: 'Executive Transport',
      description: 'VIP transportation for business executives and special occasions',
      icon: '🚁',
      features: ['Luxury interiors', 'Professional pilots', 'Flexible scheduling', 'Ground transportation coordination']
    },
    {
      id: 'scenic-tours',
      title: 'Scenic Tours',
      description: 'Breathtaking aerial tours of the Hawaiian Islands',
      icon: '🌺',
      features: ['Experienced tour guides', 'Photo opportunities', 'Multiple tour routes', 'Group discounts available']
    },
    {
      id: 'medical-emergency',
      title: 'Medical Emergency',
      description: 'Critical medical transportation and emergency services',
      icon: '🚨',
      features: ['24/7 availability', 'Medical equipment', 'Trained medical crew', 'Hospital coordination']
    },
    {
      id: 'cargo-utility',
      title: 'Cargo & Utility',
      description: 'Heavy lifting, construction support, and cargo transportation',
      icon: '📦',
      features: ['External load operations', 'Construction support', 'Survey missions', 'Specialized equipment']
    },
    {
      id: 'wedding-events',
      title: 'Wedding & Events',
      description: 'Make your special day unforgettable with helicopter services',
      icon: '💒',
      features: ['Wedding transportation', 'Aerial photography', 'Special decorations', 'Custom packages']
    },
    {
      id: 'film-photography',
      title: 'Film & Photography',
      description: 'Professional aerial filming and photography services',
      icon: '📽️',
      features: ['Professional crew', 'Specialized equipment', 'Multiple angles', 'Post-production support']
    }
  ];

  // Handle pre-selected service from navigation state
  useEffect(() => {
    if (location.state?.selectedService) {
      const selectedService = location.state.selectedService;
      // Map service titles to service IDs
      const serviceMapping = {
        'Executive Transport': 'executive-transport',
        'Scenic Tours': 'scenic-tours',
        'Medical Emergency': 'medical-emergency',
        'Cargo & Utility': 'cargo-utility',
        'Wedding & Events': 'wedding-events',
        'Film & Photography': 'film-photography',
        'Aerial Film & Cinematography': 'film-photography',
        'Science & Research': 'cargo-utility', // Map to closest match
        'External Sling Loads': 'cargo-utility',
        'Personnel Insert & Extract': 'executive-transport',
        'Ground Logistics & Planning': 'cargo-utility',
        'Congested Area Plans': 'cargo-utility'
      };
      
      const serviceId = serviceMapping[selectedService];
      if (serviceId) {
        setFormData(prev => ({
          ...prev,
          serviceType: serviceId
        }));
      }
    }
  }, [location.state]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quote request submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Quote request submitted successfully! We will contact you within 24 hours.');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Select Your Service</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceTypes.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.serviceType === service.id
                      ? 'border-orange-500 bg-orange-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
                  }`}
                  onClick={() => handleInputChange('serviceType', service.id)}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h4>
                  <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <svg className="w-3 h-3 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {formData.serviceType === service.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Service Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aircraft Type Preference</label>
                <select
                  value={formData.aircraft}
                  onChange={(e) => handleInputChange('aircraft', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Aircraft</option>
                  <option value="robinson-r44">Robinson R44</option>
                  <option value="robinson-r66">Robinson R66</option>
                  <option value="bell-206">Bell 206</option>
                  <option value="bell-407">Bell 407</option>
                  <option value="airbus-h125">Airbus H125</option>
                  <option value="other">Other/No Preference</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Passengers</label>
                <select
                  value={formData.passengers}
                  onChange={(e) => handleInputChange('passengers', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Passengers</option>
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                  <option value="5">5 Passengers</option>
                  <option value="6+">6+ Passengers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                <input
                  type="date"
                  value={formData.flightDate}
                  onChange={(e) => handleInputChange('flightDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                <input
                  type="time"
                  value={formData.flightTime}
                  onChange={(e) => handleInputChange('flightTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Duration</option>
                  <option value="30min">30 minutes</option>
                  <option value="1hour">1 hour</option>
                  <option value="2hours">2 hours</option>
                  <option value="half-day">Half day</option>
                  <option value="full-day">Full day</option>
                  <option value="multi-day">Multiple days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flight Flexibility</label>
                <select
                  value={formData.flexibility}
                  onChange={(e) => handleInputChange('flexibility', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Flexibility</option>
                  <option value="fixed">Fixed date and time</option>
                  <option value="somewhat">Somewhat flexible</option>
                  <option value="very">Very flexible</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Origin/Departure Point</label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="Enter departure location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination (if applicable)</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  placeholder="Enter destination (for point-to-point flights)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Any special requirements, equipment needs, or additional services"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization (Optional)</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Enter company name if applicable"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Additional Details</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Budget Range</option>
                  <option value="under-1000">Under $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="over-10000">Over $10,000</option>
                  <option value="discuss">Prefer to discuss</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Any additional details, questions, or special circumstances we should know about"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Quote Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Type:</span>
                    <span className="font-medium">{serviceTypes.find(s => s.id === formData.serviceType)?.title || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formData.flightDate || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passengers:</span>
                    <span className="font-medium">{formData.passengers || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{formData.duration || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${helicopterBg})`
          }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Request a <span className="text-orange-500">Quote</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
            >
              Get a personalized quote for your helicopter service needs in just a few simple steps. 
              Professional, reliable, and tailored to your specific requirements.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3 text-white">
                <span className="text-orange-400 font-semibold">✓</span> Free consultation
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3 text-white">
                <span className="text-orange-400 font-semibold">✓</span> Quick response
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3 text-white">
                <span className="text-orange-400 font-semibold">✓</span> Custom solutions
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= step
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step ? 'text-orange-600' : 'text-gray-500'
                }`}>
                  {step === 1 && 'Service'}
                  {step === 2 && 'Details'}
                  {step === 3 && 'Contact'}
                  {step === 4 && 'Review'}
                </span>
                {step < 4 && (
                  <div className={`w-12 h-1 mx-4 ${
                    currentStep > step ? 'bg-orange-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                  disabled={currentStep === 1}
                >
                  Previous
                </button>

                <div className="text-sm text-gray-500">
                  Step {currentStep} of 4
                </div>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    disabled={currentStep === 1 && !formData.serviceType}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Submit Quote Request
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help or Have Questions?</h3>
          <p className="text-gray-300 mb-6">
            Our team is here to help you plan the perfect helicopter service experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+1808XXXXXXX" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300">
              Call (808) XXX-XXXX
            </a>
            <a href="mailto:quotes@verticalworx.com" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestQuote; 