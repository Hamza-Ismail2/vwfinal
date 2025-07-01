import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import aboutBackground from '../images/HI_KOH-COAST_407_001-SHIBSTY-1-scaled.jpg';
import helicopterFleet from '../images/Bell-407-Hughes-500-Flight-over-Old-Flow.jpg';
import operationsImage from '../images/IMG_7065-scaled.jpg';
import vipService from '../images/kahua-VIP-arrival-scaled.jpg';

const AboutUs = () => {
  const certifications = [
    {
      title: "FAA Part 135",
      description: "Certified for commercial passenger and cargo operations",
      icon: "✈️"
    },
    {
      title: "FAA Part 133",
      description: "External load operations and rotorcraft certification",
      icon: "🚁"
    },
    {
      title: "FAA Part 137",
      description: "Agricultural aircraft operations certification",
      icon: "🌾"
    },
    {
      title: "OAS Certified",
      description: "Aircraft and pilots certified to the highest standards",
      icon: "🏆"
    }
  ];

  const values = [
    {
      title: "Safety Excellence",
      description: "We operate under rigorous FAA certifications (Part 135, 133, 137) and strict protocols to ensure every mission is conducted with the highest safety standards from takeoff to touchdown.",
      icon: "🛡️"
    },
    {
      title: "Team Expertise",
      description: "Our experienced pilots and crew bring years of specialized training and mission-ready focus to every operation. We're problem-solvers in the air, trusted by industries across the islands.",
      icon: "👨‍✈️"
    },
    {
      title: "Local Knowledge",
      description: "Deep understanding of Hawaiian Islands terrain, weather patterns, and regulations gives us unmatched operational capabilities.",
      icon: "🌺"
    },
    {
      title: "Veteran Leadership",
      description: "Military precision and discipline combined with local expertise delivers dependable, versatile, and safe helicopter services.",
      icon: "⭐"
    }
  ];

  const capabilities = [
    {
      title: "Certified Aircraft",
      description: "Modern fleet of helicopters certified for commercial operations",
      items: ["Commercial Operations", "Emergency Response", "Heavy Lift Capability", "Multi-Mission Ready"]
    },
    {
      title: "Qualified Pilots",
      description: "Experienced aviators with specialized training and certifications",
      items: ["Commercial Licenses", "Instrument Rated", "Military Experience", "Continuous Training"]
    },
    {
      title: "Full Service Support",
      description: "Complete operational support for all mission requirements",
      items: ["Insurance Coverage", "Rigging & Equipment", "Permits & Planning", "Ground Crew Support"]
    },
    {
      title: "Communication & Fuel",
      description: "Advanced systems and logistics for seamless operations",
      items: ["Radio Communications", "Fuel Support", "Navigation Systems", "Weather Monitoring"]
    }
  ];

  const stats = [
    { number: "100+", label: "Satisfied Partners", description: "Trusted by industry leaders across Hawaii" },
    { number: "15+", label: "Years of Expertise", description: "Proven track record of excellence" },
    { number: "2500+", label: "Flight Missions", description: "Successful operations completed" },
    { number: "8760", label: "Hours Operational Support", description: "Around-the-clock service capability" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={aboutBackground}
            alt="Helicopter flying over Hawaiian coast"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-orange-500 font-semibold text-lg mb-4">Who We Are</h3>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                About <span className="text-orange-500">Vertical Worx</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8">
                Locally owned and veteran-operated company providing comprehensive Helicopter Services 
                with unmatched professionalism and safety across the Hawaiian Islands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Our Services
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-200 leading-relaxed mb-6">
                  We're a full-service provider, handling everything from certified aircraft and qualified 
                  pilots to insurance, rigging, permits, ground crew, radio communications, and fuel support.
                </p>
                <p className="text-orange-300 font-semibold">
                  "When it's done right, it just WORX."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                Comprehensive Helicopter Services
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Vertical Worx is a locally owned and veteran-operated company providing comprehensive 
                  Helicopter Services. We're a full-service provider, handling everything from certified 
                  aircraft and qualified pilots to insurance, rigging, permits, ground crew, radio 
                  communications, and fuel support.
                </p>
                <p className="text-lg">
                  Our FAA certifications (FAR 135, 133, & 137) and OAS-certified aircraft and pilots 
                  demonstrate our commitment to safety and professionalism.
                </p>
                <p className="text-lg">
                  We combine local expertise, military-grade discipline, and advanced aviation capabilities 
                  to deliver dependable, versatile, and safe Helicopter Services across Hawaii. Whether 
                  it's aerial construction or critical utility work, our team is built to perform.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Image Gallery */}
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-xl overflow-hidden shadow-lg group"
                >
                  <img
                    src={helicopterFleet}
                    alt="Helicopter fleet in operation"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h4 className="text-white font-semibold">Fleet Operations</h4>
                    <p className="text-gray-200 text-sm">Professional helicopter services</p>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-xl overflow-hidden shadow-lg group"
                >
                  <img
                    src={vipService}
                    alt="VIP helicopter arrival"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h4 className="text-white font-semibold">VIP Services</h4>
                    <p className="text-gray-200 text-sm">Luxury transport solutions</p>
                  </div>
                </motion.div>
              </div>

              {/* Service Cards */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 rounded-xl p-6 shadow-lg"
                >
                  <div className="text-3xl mb-4">🚁</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Certified Helicopter Services</h4>
                  <p className="text-gray-600">
                    We're an FAA 135, 133 & 137 certified operator, offering professional, 
                    compliant, and versatile helicopter solutions throughout Hawaii.
                  </p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 rounded-xl p-6 shadow-lg"
                >
                  <div className="text-3xl mb-4">🛠️</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Complete Aerial Solutions</h4>
                  <p className="text-gray-600">
                    From pilots and aircraft to permits, rigging, and fuel—we provide full-service 
                    support for all your commercial, utility, and tour-based aviation needs.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
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
              Our <span className="text-orange-600">Certifications</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our FAA certifications and OAS-certified aircraft and pilots demonstrate our commitment to safety and professionalism
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Excellence in Numbers</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Our track record speaks for itself - consistent performance and unwavering commitment to safety
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-4">
                  {stat.number}
                </div>
                <div className="text-white/90 font-medium text-lg mb-2">
                  {stat.label}
                </div>
                <div className="text-white/70 text-sm">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
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
              Why Choose <span className="text-orange-600">Vertical Worx</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elevating Helicopter Services with Precision and Purpose
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-5xl">{value.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Capabilities */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Full-Service <span className="text-orange-500">Provider</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete operational support for all your aviation needs - from aircraft and pilots to permits and fuel
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-4 text-orange-400">
                  {capability.title}
                </h3>
                <p className="text-gray-300 mb-6 text-sm">
                  {capability.description}
                </p>
                <ul className="space-y-2">
                  {capability.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-400">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience Excellence?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join the hundreds of clients who trust Vertical Worx for their aviation needs. 
              From routine operations to emergency response, we deliver when it matters most.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/request-quote"
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                >
                  Request Quote
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/projects-case-studies"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 inline-block"
                >
                  View Our Projects
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;