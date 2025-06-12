import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const handleRequestQuote = (serviceTitle = '') => {
    navigate('/request-quote', { state: { selectedService: serviceTitle } });
  };

  const services = [
    {
      id: 1,
      title: "Aerial Film & Cinematography",
      description: "High-quality aerial visuals for film, TV, and commercial productions—delivering stunning perspectives with expert precision.",
      icon: "🎬",
      features: [
        "Gyro-stabilized camera systems",
        "4K/8K video capabilities", 
        "Professional camera operators",
        "Film permit coordination",
        "Commercial production support",
        "Post-production consultation"
      ],
      certifications: ["FAA Part 107", "Commercial Operations"],
      pricing: "Contact for project rates"
    },
    {
      id: 2,
      title: "Science & Research",
      description: "Trusted partner for airborne data collection, environmental surveys, and research support in diverse field conditions.",
      icon: "🔬",
      features: [
        "Environmental monitoring",
        "Data collection systems",
        "Scientific equipment transport",
        "Research site access",
        "Wildlife survey support",
        "Atmospheric data gathering"
      ],
      certifications: ["Research Protocols", "Data Collection"],
      pricing: "Customized research packages"
    },
    {
      id: 3,
      title: "External Sling Loads",
      description: "Expert sling load operations for delivering cargo to remote or hard-to-access locations with precision.",
      icon: "🚁",
      features: [
        "Heavy lift capability",
        "Construction material transport",
        "Remote area delivery",
        "Precision load placement",
        "Equipment positioning",
        "Multi-point lift systems"
      ],
      certifications: ["FAA Part 133", "Heavy Lift Operations"],
      pricing: "From $3,500/hour"
    },
    {
      id: 4,
      title: "Personnel Insert & Extract",
      description: "Safe and efficient transport of personnel into remote sites for field work, inspections, and mission-critical tasks.",
      icon: "👥",
      features: [
        "Remote site access",
        "Emergency evacuation",
        "Crew transportation",
        "Field team support",
        "Search and rescue",
        "Safety protocol compliance"
      ],
      certifications: ["Safety Protocols", "Remote Operations"],
      pricing: "From $2,400/hour"
    },
    {
      id: 5,
      title: "Ground Logistics & Planning",
      description: "Comprehensive planning and coordination to ensure smooth, safe, and efficient ground-to-air operations.",
      icon: "📋",
      features: [
        "Mission planning services",
        "Permit coordination",
        "Route optimization", 
        "Weather monitoring",
        "Risk assessment",
        "Logistics coordination"
      ],
      certifications: ["Mission Planning", "Logistics Coordination"],
      pricing: "Included with operations"
    },
    {
      id: 6,
      title: "Congested Area Plans",
      description: "Specialized aerial solutions for complex, urban, or high-traffic areas—ensuring compliance, safety, and smooth execution.",
      icon: "🏙️",
      features: [
        "Urban operations planning",
        "Traffic coordination",
        "Noise abatement procedures",
        "Regulatory compliance",
        "Safety risk mitigation",
        "Municipal permit assistance"
      ],
      certifications: ["Urban Operations", "Traffic Management"],
      pricing: "Custom area plans"
    }
  ];

  const specializedServices = [
    {
      title: "Construction Support",
      description: "Heavy-lift operations for construction projects across Hawaii",
      icon: "🏗️",
      capabilities: ["Material transport", "Equipment positioning", "Site survey"]
    },
    {
      title: "Emergency Response",
      description: "24/7 emergency services including search and rescue operations",
      icon: "🚨",
      capabilities: ["Medical evacuation", "Disaster response", "Search operations"]
    },
    {
      title: "Agricultural Operations",
      description: "Specialized agricultural support including crop monitoring and transport",
      icon: "🌾",
      capabilities: ["Crop survey", "Equipment transport", "Agricultural logistics"]
    },
    {
      title: "Utility Support",
      description: "Power line inspection, maintenance, and utility infrastructure support",
      icon: "⚡",
      capabilities: ["Line inspection", "Equipment transport", "Emergency repairs"]
    }
  ];

  const certificationHighlights = [
    {
      title: "FAA Part 135",
      description: "Commercial passenger and cargo operations",
      icon: "✈️"
    },
    {
      title: "FAA Part 133", 
      description: "External load operations certification",
      icon: "🚁"
    },
    {
      title: "FAA Part 137",
      description: "Agricultural aircraft operations",
      icon: "🌾"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-orange-500 font-semibold text-lg mb-4">Our Services</h3>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Best Experience of Riding An <br/><span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Air Transportation</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
              At Vertical Worx, we offer FAA-certified helicopter services across Hawaii, supporting 
              industries like construction, agriculture, media, and emergency response. Our experienced 
              team delivers safe, precise, and efficient aerial solutions—every mission, every time.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRequestQuote()}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Request Quote
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Comprehensive Aviation Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional helicopter services tailored to meet your specific operational requirements 
              across the Hawaiian Islands
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                  <div className="text-8xl opacity-20 absolute">
                    {service.icon}
                  </div>
                  <div className="relative z-10 text-white text-center">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Service Features:</h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center text-sm text-gray-700">
                          <svg className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Certifications:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.certifications.map((cert, cIndex) => (
                        <span key={cIndex} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-orange-600 font-semibold text-lg">
                      {service.pricing}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleRequestQuote(service.title)}
                      className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Request Quote
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              FAA <span className="text-orange-600">Certified</span> Operations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive certifications ensure the highest standards of safety, 
              compliance, and operational excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {certificationHighlights.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-6">{cert.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {cert.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Specialized <span className="text-orange-600">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry-specific helicopter services designed for Hawaii's unique challenges and requirements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specializedServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.capabilities.map((capability, cIndex) => (
                    <li key={cIndex} className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      {capability}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Why Choose Vertical Worx?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">100% Safety Record</h3>
                    <p className="text-white/90">Rigorous FAA certifications and strict protocols ensure every mission meets the highest safety standards.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-2xl">👨‍✈️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                    <p className="text-white/90">Experienced pilots and crew with specialized training and mission-ready focus for every operation.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-2xl">🌺</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
                    <p className="text-white/90">Deep understanding of Hawaiian Islands terrain, weather patterns, and operational requirements.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
                <p className="text-white/90 mb-8 leading-relaxed">
                  Contact our team today to discuss your project requirements and receive a customized 
                  service proposal. We're here to make your mission successful.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📞</span>
                    <span className="text-lg">(808) 930-9826</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">✉️</span>
                    <span className="text-lg">info@verticalworx.aero</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRequestQuote()}
                  className="mt-6 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                >
                  Request Service Quote
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Discuss Your Mission
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Every operation is unique. Our team works closely with you to understand your 
              specific requirements and deliver customized aviation solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRequestQuote()}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Schedule Consultation
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                View Our Projects
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services; 