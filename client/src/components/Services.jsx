import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import executiveTransport from '../images/kahua-VIP-arrival-scaled.jpg';
import scenicTours from '../images/Oahu-Magnum-Experience-over-water-scaled.jpg';
import weddingService from '../images/OA_WEDD_MAG_OFF_004-SHIBSTY-1-scaled.jpg';
import filmProduction from '../images/IMG_7075-scaled.jpg';
import cargoService from '../images/Raptor_ATV_action-scaled.jpg';
import coastalView from '../images/HI_KOH-COAST_407_001-SHIBSTY-1-scaled.jpg';

const Services = () => {
  const navigate = useNavigate();

  const handleRequestQuote = (serviceTitle = '') => {
    navigate('/request-quote', { state: { selectedService: serviceTitle } });
  };

  const services = [
    {
      id: 1,
      title: "Executive Transport",
      description: "Premium VIP transportation for business executives and high-profile clients",
      features: [
        "Door-to-door service",
        "Luxury interiors",
        "Professional pilots",
        "Flexible scheduling"
      ],
      price: "From $2,500/hour",
      image: "🚁",
      photo: executiveTransport,
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Scenic Tours",
      description: "Breathtaking aerial tours of stunning landscapes and city skylines",
      features: [
        "Professional guide",
        "Multiple tour routes",
        "Photography support",
        "Group discounts"
      ],
      price: "From $850/person",
      image: "🌄",
      photo: scenicTours,
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      title: "Medical Emergency",
      description: "Life-saving medical transport and emergency evacuation services",
      features: [
        "24/7 availability",
        "Medical equipment",
        "Certified medical crew",
        "Rapid response"
      ],
      price: "Contact for pricing",
      image: "🏥",
      photo: coastalView,
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-50"
    },
    {
      id: 4,
      title: "Cargo & Utility",
      description: "Heavy lifting, construction support, and specialized cargo transport",
      features: [
        "Heavy lifting capability",
        "Construction support",
        "Remote area access",
        "Specialized equipment"
      ],
      price: "From $3,200/hour",
      image: "📦",
      photo: cargoService,
      color: "from-orange-500 to-orange-700",
      bgColor: "bg-orange-50"
    },
    {
      id: 5,
      title: "Wedding & Events",
      description: "Make your special day unforgettable with dramatic helicopter arrivals",
      features: [
        "Dramatic entrances",
        "Aerial photography",
        "Custom decorations",
        "Multiple packages"
      ],
      price: "From $1,800/event",
      image: "💒",
      photo: weddingService,
      color: "from-pink-500 to-pink-700",
      bgColor: "bg-pink-50"
    },
    {
      id: 6,
      title: "Film & Photography",
      description: "Professional aerial filming and photography for media productions",
      features: [
        "Stabilized camera mounts",
        "Professional operators",
        "4K/8K capabilities",
        "Insurance included"
      ],
      price: "From $2,200/hour",
      image: "🎬",
      photo: filmProduction,
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From executive transport to emergency services, we provide comprehensive helicopter solutions 
            tailored to your specific needs with the highest standards of safety and professionalism.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full">
                {/* Header with Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.photo}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`}></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-3xl mb-2 block">{service.image}</span>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  {/* Price removed as per requirements */}
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="border-t border-gray-100 pt-6">
                    <button 
                      onClick={() => handleRequestQuote(service.title)}
                      className={`w-full py-3 px-6 bg-gradient-to-r ${service.color} text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-white rounded-2xl shadow-lg p-8 lg:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our Services?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Certified Safety Standards</h4>
                    <p className="text-gray-600">All aircraft maintained to the highest FAA standards with regular inspections</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">24/7 Availability</h4>
                    <p className="text-gray-600">Round-the-clock service for emergency situations and urgent transport needs</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Luxury Experience</h4>
                    <p className="text-gray-600">Premium interiors and amenities for the ultimate comfort and experience</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">🚁</div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Ready to Fly?</h4>
                <p className="text-gray-600 mb-6">
                  Contact us today for a personalized quote and let us make your helicopter experience unforgettable.
                </p>
                <button 
                  onClick={() => handleRequestQuote()}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Get Quote Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 