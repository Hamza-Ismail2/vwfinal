import React from 'react';
import { motion } from 'framer-motion';
import certificationsBackground from '../images/Bell-407-Hughes-500-Flight-over-Old-Flow.jpg';
import safetyImage from '../images/IMG_7097-scaled-1-1462x2048.jpg';

const CertificationsCompliance = () => {
  const faaCertifications = [
    {
      title: "FAA Part 135",
      subtitle: "Air Carrier Operations",
      description: "Certified for commercial passenger and cargo operations under strict federal aviation regulations.",
      icon: "✈️",
      details: [
        "Commercial passenger transport operations",
        "Cargo and freight delivery services", 
        "On-demand charter flights",
        "Rigorous pilot training requirements",
        "Comprehensive maintenance protocols",
        "Safety management system implementation"
      ],
      compliance: "Full compliance with 14 CFR Part 135"
    },
    {
      title: "FAA Part 133", 
      subtitle: "External Load Operations",
      description: "Certified for rotorcraft external-load operations including heavy-lift and construction support.",
      icon: "🚁",
      details: [
        "External sling load operations",
        "Construction material transport",
        "Heavy-lift cargo operations",
        "Precision load placement",
        "Multi-point external load systems",
        "Specialized rigging equipment"
      ],
      compliance: "Full compliance with 14 CFR Part 133"
    },
    {
      title: "FAA Part 137",
      subtitle: "Agricultural Aircraft Operations", 
      description: "Certified for agricultural aircraft operations and specialized aerial application services.",
      icon: "🌾",
      details: [
        "Agricultural spray operations",
        "Crop monitoring and surveying",
        "Aerial seeding operations",
        "Environmental monitoring",
        "Agricultural equipment transport",
        "Precision application techniques"
      ],
      compliance: "Full compliance with 14 CFR Part 137"
    }
  ];

  const additionalCertifications = [
    {
      title: "OAS Certified Aircraft",
      description: "All aircraft certified to operational airworthiness standards with continuous monitoring",
      icon: "🛡️",
      features: ["Annual inspections", "Progressive maintenance", "Airworthiness compliance", "Safety record tracking"]
    },
    {
      title: "OAS Certified Pilots",
      description: "All pilots maintain current certifications and undergo continuous training programs",
      icon: "👨‍✈️", 
      features: ["Commercial pilot licenses", "Instrument ratings", "Type certifications", "Recurrent training"]
    },
    {
      title: "Insurance & Bonding",
      description: "Comprehensive insurance coverage and bonding for all operations and client protection",
      icon: "📋",
      features: ["General liability coverage", "Aircraft hull insurance", "Workers compensation", "Professional liability"]
    },
    {
      title: "Safety Management System",
      description: "Implemented safety management system with continuous improvement and risk assessment",
      icon: "🔒",
      features: ["Risk assessment protocols", "Safety reporting system", "Incident investigation", "Continuous improvement"]
    }
  ];

  const complianceAreas = [
    {
      category: "Operational Safety",
      standards: [
        "FAA Safety Management System (SMS) implementation",
        "Rigorous maintenance protocols and inspection schedules", 
        "Pilot proficiency checks and recurrent training",
        "Weather monitoring and flight risk assessment",
        "Emergency response procedures and protocols",
        "Ground crew safety training and certification"
      ]
    },
    {
      category: "Regulatory Compliance",
      standards: [
        "Federal Aviation Regulations (FAR) compliance",
        "Occupational Safety and Health Administration (OSHA) standards",
        "Environmental Protection Agency (EPA) regulations",
        "Department of Transportation (DOT) requirements",
        "State of Hawaii aviation regulations",
        "Local municipal operating permits"
      ]
    },
    {
      category: "Quality Assurance",
      standards: [
        "Continuous airworthiness monitoring programs",
        "Quality control processes for all operations",
        "Document control and record keeping systems",
        "Performance monitoring and metrics tracking",
        "Customer feedback and satisfaction programs",
        "Third-party safety audits and assessments"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={certificationsBackground}
            alt="Certified helicopter operations"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-orange-500 font-semibold text-lg mb-4">Safety & Compliance</h3>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Certifications & <span className="text-orange-500">Compliance</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
              Our FAA certifications (FAR 135, 133, & 137) and OAS-certified aircraft and pilots 
              demonstrate our unwavering commitment to safety and professionalism in every operation.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Request Safety Documentation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* FAA Certifications */}
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
              FAA <span className="text-orange-600">Certifications</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We operate under rigorous FAA certifications and strict protocols to ensure every mission 
              is conducted with the highest safety standards from takeoff to touchdown.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {faaCertifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-5xl mb-6 text-center">{cert.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                  {cert.title}
                </h3>
                <h4 className="text-lg font-semibold text-orange-600 mb-4 text-center">
                  {cert.subtitle}
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed text-center">
                  {cert.description}
                </p>
                
                <div className="mb-6">
                  <h5 className="font-semibold text-gray-800 mb-3">Operational Capabilities:</h5>
                  <ul className="space-y-2">
                    {cert.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-orange-100 rounded-lg p-4">
                  <p className="text-orange-800 font-semibold text-sm text-center">
                    {cert.compliance}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Certifications */}
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
              Additional <span className="text-orange-600">Certifications</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive certifications and standards that ensure operational excellence 
              and client protection across all aspects of our helicopter services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalCertifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{cert.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {cert.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {cert.description}
                </p>
                <ul className="space-y-2">
                  {cert.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-gray-700">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Framework */}
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
              Compliance <span className="text-orange-600">Framework</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive compliance framework ensures adherence to all applicable 
              regulations and industry best practices for safe helicopter operations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {complianceAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {area.category}
                </h3>
                <ul className="space-y-3">
                  {area.standards.map((standard, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <svg className="w-4 h-4 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {standard}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Record */}
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
                Uncompromising Safety Record
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Our commitment to safety excellence is reflected in our perfect safety record 
                and continuous improvement in all operational aspects. Every flight, every maintenance 
                procedure, and every client interaction reflects our core belief: when it's done right, it just WORX.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-white/90">Safety Record</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <div className="text-white/90">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">2500+</div>
                  <div className="text-white/90">Safe Operations</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-white/90">Safety Monitoring</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Request Safety Documentation</h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Need detailed information about our certifications, safety procedures, or compliance documentation? 
                Contact our team for comprehensive safety information and operational procedures.
              </p>
              
              <div className="space-y-4 mb-6">
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
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full"
              >
                Contact Safety Team
              </motion.button>
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
              Questions About Our Certifications?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Our safety and compliance team is available to discuss our certifications, 
              operational procedures, and safety protocols for your specific mission requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Schedule Safety Consultation
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Download Safety Manual
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CertificationsCompliance;