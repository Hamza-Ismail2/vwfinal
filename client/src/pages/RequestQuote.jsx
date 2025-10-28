import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import {
  BriefcaseIcon,
  MapIcon,
  LifebuoyIcon,
  CubeIcon,
  GiftIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const salesforceFormRef = useRef(null);
  const [sfSubmitting, setSfSubmitting] = useState(false);
  const retURL = `${window.location.origin}/thank-you`;
  const todayStr = new Date().toISOString().split('T')[0];

  const serviceTypes = [
    {
      id: 'executive-transport',
      title: 'Executive Transport',
      description: 'VIP transportation for business executives and special occasions',
      icon: BriefcaseIcon,
      features: ['Luxury interiors', 'Professional pilots', 'Flexible scheduling', 'Ground transportation coordination']
    },
    {
      id: 'scenic-tours',
      title: 'Scenic Tours',
      description: 'Breathtaking aerial tours of the Hawaiian Islands',
      icon: MapIcon,
      features: ['Experienced tour guides', 'Photo opportunities', 'Multiple tour routes', 'Group discounts available']
    },
    {
      id: 'medical-emergency',
      title: 'Medical Emergency',
      description: 'Critical medical transportation and emergency services',
      icon: LifebuoyIcon,
      features: ['24/7 availability', 'Medical equipment', 'Trained medical crew', 'Hospital coordination']
    },
    {
      id: 'cargo-utility',
      title: 'Cargo & Utility',
      description: 'Heavy lifting, construction support, and cargo transportation',
      icon: CubeIcon,
      features: ['External load operations', 'Construction support', 'Survey missions', 'Specialized equipment']
    },
    {
      id: 'wedding-events',
      title: 'Wedding & Events',
      description: 'Make your special day unforgettable with helicopter services',
      icon: GiftIcon,
      features: ['Wedding transportation', 'Aerial photography', 'Special decorations', 'Custom packages']
    },
    {
      id: 'film-photography',
      title: 'Film & Photography',
      description: 'Professional aerial filming and photography services',
      icon: CameraIcon,
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

  const handleInputChange = (field, value) => {
    let sanitized = value;
    if (field === 'email') sanitized = sanitizeInput(value, 'email');
    else if (field === 'phone') {
      sanitized = sanitizeInput(value, 'phone');
      sanitized = formatPhone(sanitized);
    }
    else if (field === 'passengers') sanitized = sanitizeInput(value, 'number');
    else if (field === 'budget') sanitized = sanitizeInput(value, 'text');
    else if (field === 'specialRequests') sanitized = value; // Don't sanitize while typing
    else if (field === 'additionalInfo') sanitized = value; // Don't sanitize while typing
    else if (field === 'company') sanitized = value; // Don't sanitize while typing (allow spaces in company names)
    else if (field === 'origin') sanitized = value; // Don't sanitize while typing (allow spaces in location names)
    else if (field === 'destination') sanitized = value; // Don't sanitize while typing (allow spaces in location names)
    else sanitized = sanitizeInput(value, 'text');
    setFormData(prev => ({ ...prev, [field]: sanitized }));
  };

  // Validation functions for each step
  const validateStep1 = () => {
    if (!formData.serviceType) {
      alert('Please select a service type before proceeding.');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const requiredFields = [
      { field: 'aircraft', label: 'Aircraft Type Preference' },
      { field: 'passengers', label: 'Number of Passengers' },
      { field: 'flightDate', label: 'Preferred Date' },
      { field: 'flightTime', label: 'Preferred Time' },
      { field: 'duration', label: 'Duration' },
      { field: 'flexibility', label: 'Flight Flexibility' },
      { field: 'origin', label: 'Origin/Departure Point' }
    ];

    for (const { field, label } of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        alert(`Please fill in the ${label} field before proceeding.`);
        return false;
      }
    }

    // ADD: ensure flightDate is not in the past
    const selectedDate = new Date(formData.flightDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert('Preferred Date cannot be in the past.');
      return false;
    }

    return true;
  };

  const validateStep3 = () => {
    const requiredFields = [
      { field: 'firstName', label: 'First Name' },
      { field: 'lastName', label: 'Last Name' },
      { field: 'email', label: 'Email Address' },
      { field: 'phone', label: 'Phone Number' }
    ];

    for (const { field, label } of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        alert(`Please fill in the ${label} field before proceeding.`);
        return false;
      }
    }

    // Additional email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    // Additional phone validation (should have at least 10 digits)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      alert('Please enter a valid phone number with at least 10 digits.');
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (currentStep < 4) {
      let canProceed = false;

      switch (currentStep) {
        case 1:
          canProceed = validateStep1();
          break;
        case 2:
          canProceed = validateStep2();
          break;
        case 3:
          canProceed = validateStep3();
          break;
        default:
          canProceed = true;
      }

      if (canProceed) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDualSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      return;
    }
    setIsSubmitting(true);
    
    // Prepare payload for /api/quotes
    const payload = {
      serviceType: formData.serviceType,
      aircraft: formData.aircraft,
      passengers: formData.passengers,
      flightDate: formData.flightDate,
      flightTime: formData.flightTime,
      duration: formData.duration,
      origin: formData.origin,
      destination: formData.destination,
      specialRequests: formData.specialRequests,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: sanitizeInput(formData.email, 'email'),
      phone: sanitizeInput(formData.phone, 'phone').slice(0, 3) + '-' + sanitizeInput(formData.phone, 'phone').slice(3, 10),
      company: formData.company,
      budget: formData.budget,
      flexibility: formData.flexibility,
      additionalInfo: formData.additionalInfo
    };
    
    try {
      // Step 1: Submit to backend and WAIT for it to complete
      console.log('📤 Starting backend API call...');
      const backendResponse = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      console.log('✅ Backend API completed, status:', backendResponse.status);
    } catch (error) {
      console.error('❌ Error posting to backend:', error);
    }

    // Step 2: Submit to Salesforce (will auto-redirect via retURL)
    if (salesforceFormRef.current) {
      console.log('📤 Starting Salesforce submission...');
      salesforceFormRef.current['oid'].value = '00DHr0000077ygs';
      salesforceFormRef.current['retURL'].value = retURL;
      salesforceFormRef.current['lead_source'].value = 'Web';
      salesforceFormRef.current['first_name'].value = formData.firstName;
      salesforceFormRef.current['last_name'].value = formData.lastName;
      salesforceFormRef.current['company'].value = formData.company || ''; // Leave empty if blank
      salesforceFormRef.current['email'].value = formData.email;
      salesforceFormRef.current['phone'].value = formData.phone;
      
      // Map service type to readable format
      const serviceTypeMapping = {
        'executive-transport': 'Executive Transport',
        'scenic-tours': 'Scenic Tours',
        'medical-emergency': 'Medical Emergency',
        'cargo-utility': 'Cargo & Utility',
        'wedding-events': 'Wedding & Events',
        'film-photography': 'Film & Photography'
      };
      
      // Populate Salesforce custom fields
      salesforceFormRef.current['00NPY00000CKNb4'].value = serviceTypeMapping[formData.serviceType] || formData.serviceType; // Service Type
      salesforceFormRef.current['00NPY00000CK7b8'].value = formData.passengers ? `${formData.passengers} Passenger${formData.passengers > 1 ? 's' : ''}` : ''; // Number of Passengers
      salesforceFormRef.current['00NPY00000CK7eM'].value = [
        `Aircraft: ${formData.aircraft || 'Not specified'}`,
        `Duration: ${formData.duration || 'Not specified'}`,
        `Origin: ${formData.origin || 'Not specified'}`,
        formData.destination ? `Destination: ${formData.destination}` : '',
        formData.specialRequests ? `Special Requests: ${formData.specialRequests}` : '',
        formData.budget ? `Budget: ${formData.budget}` : '',
        formData.flexibility ? `Flexibility: ${formData.flexibility}` : '',
        formData.additionalInfo ? `Additional Info: ${formData.additionalInfo}` : ''
      ].filter(Boolean).join('\n'); // Additional Details
      salesforceFormRef.current['00NPY00000CKKLR'].value = convertDateForSalesforce(formData.flightDate); // Preferred Date (converted to MM/DD/YYYY)
      
      setSfSubmitting(true);
      salesforceFormRef.current.submit();
      console.log('✅ Form submitted to Salesforce');
    }
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
                  <div className="mb-4">
                    {React.createElement(service.icon, { className: 'w-10 h-10 text-orange-500' })}
                  </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Aircraft Type Preference <span className="text-red-500">*</span></label>
                <select
                  value={formData.aircraft}
                  onChange={(e) => handleInputChange('aircraft', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  required
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Passengers <span className="text-red-500">*</span></label>
                <select
                  value={formData.passengers}
                  onChange={(e) => handleInputChange('passengers', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  required
                >
                  <option value="">Select Passengers</option>
                  <option value="1">1 Passenger</option>
                  <option value="2">2 Passengers</option>
                  <option value="3">3 Passengers</option>
                  <option value="4">4 Passengers</option>
                  <option value="5">5 Passengers</option>
                  <option value="6">6 Passengers</option>
                  <option value="7">7 Passengers</option>
                  <option value="8">8 Passengers</option>
                  <option value="9">9 Passengers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={formData.flightDate}
                  onChange={(e) => handleInputChange('flightDate', e.target.value)}
                  min={todayStr}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time <span className="text-red-500">*</span></label>
                <input
                  type="time"
                  value={formData.flightTime}
                  onChange={(e) => handleInputChange('flightTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration <span className="text-red-500">*</span></label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  required
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Flight Flexibility <span className="text-red-500">*</span></label>
                <select
                  value={formData.flexibility}
                  onChange={(e) => handleInputChange('flexibility', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  required
                >
                  <option value="">Select Flexibility</option>
                  <option value="fixed">Fixed date and time</option>
                  <option value="somewhat">Somewhat flexible</option>
                  <option value="very">Very flexible</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Origin/Departure Point <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="Enter departure location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination (if applicable)</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  placeholder="Enter destination (for point-to-point flights)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Any special requirements, equipment needs, or additional services"
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={e => handleInputChange('firstName', e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={e => handleInputChange('lastName', e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value.replace(/\s/g, ''))}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  required
                  pattern="[^\s]+"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="XXX-XXXXXXX"
                  maxLength={11}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization (Optional)</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={e => handleInputChange('company', e.target.value)}
                  placeholder="Enter company name if applicable"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 bg-white"
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Quote Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Type:</span>
                    <span className="font-medium text-gray-800">{serviceTypes.find(s => s.id === formData.serviceType)?.title || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-800">{formData.flightDate || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passengers:</span>
                    <span className="font-medium text-gray-800">{formData.passengers || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-800">{formData.duration || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium text-gray-800">{formData.firstName} {formData.lastName}</span>
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
          <div className="flex flex-wrap items-center justify-center gap-2 sm:space-x-8">
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
                  <div className={`w-8 sm:w-12 h-1 mx-2 sm:mx-4 ${
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
            <div className="bg-white rounded-2xl shadow-xl p-8">
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
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 text-sm sm:text-base sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleDualSubmit}
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 text-sm sm:text-base sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    disabled={isSubmitting || sfSubmitting}
                  >
                    {isSubmitting || sfSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                )}
              </div>
              {/* Hidden Salesforce Web-to-Lead form */}
              <form
                ref={salesforceFormRef}
                action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
                method="POST"
                style={{ display: 'none' }}
              >
                <input type="hidden" name="oid" />
                <input type="hidden" name="retURL" />
                <input type="hidden" name="lead_source" value="Web" />
                <input type="hidden" name="first_name" />
                <input type="hidden" name="last_name" />
                <input type="hidden" name="company" />
                <input type="hidden" name="email" />
                <input type="hidden" name="phone" />
                
                {/* Salesforce Custom Fields */}
                <input type="hidden" name="00NPY00000CKNb4" /> {/* Service Type */}
                <input type="hidden" name="00NPY00000CK7b8" /> {/* Number of Passengers */}
                <input type="hidden" name="00NPY00000CK7eM" /> {/* Additional Details */}
                <input type="hidden" name="00NPY00000CKKLR" /> {/* Preferred Date */}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Need Help or Have Questions?</h3>
          <p className="text-gray-300 mb-6 text-sm sm:text-base max-w-2xl mx-auto">
            Our team is here to help you plan the perfect helicopter service experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <a href="tel:+18089309826" className="w-full sm:w-auto bg-orange-500 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 text-center whitespace-nowrap">
              Call (808) 930-9826
            </a>
            <a href="mailto:info@verticalworx.aero" className="w-full sm:w-auto border-2 border-white text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 text-center whitespace-nowrap">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestQuote; 