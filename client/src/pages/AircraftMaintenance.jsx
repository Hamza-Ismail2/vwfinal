import React from 'react';
import { motion } from 'framer-motion';

const AircraftMaintenance = () => {
  const maintenancePrograms = [
    {
      title: "Scheduled Maintenance",
      description: "Comprehensive preventive maintenance programs following manufacturer specifications",
      features: ["100-hour inspections", "Annual inspections", "Progressive maintenance", "Calendar-based service"],
      icon: "⏰"
    },
    {
      title: "Emergency Repairs",
      description: "24/7 emergency repair services to get you back in the air quickly",
      features: ["AOG (Aircraft on Ground) support", "Field service calls", "Emergency parts procurement", "Rapid diagnostics"],
      icon: "🚨"
    },
    {
      title: "Component Overhaul",
      description: "Complete overhaul services for engines, transmissions, and critical components",
      features: ["Engine overhauls", "Transmission rebuilds", "Rotor head service", "Hydraulic system service"],
      icon: "🔧"
    },
    {
      title: "Avionics Service",
      description: "Modern avionics installation, upgrade, and repair services",
      features: ["GPS/WAAS upgrades", "Communication systems", "Navigation equipment", "Flight instruments"],
      icon: "📡"
    }
  ];

  const capabilities = [
    "FAA Part 145 Repair Station",
    "Robinson Helicopter Factory Authorized Service Center",
    "Bell Helicopter Authorized Service Facility",
    "Turbine Engine Maintenance",
    "Non-Destructive Testing (NDT)",
    "Sheet Metal Fabrication",
    "Composite Repairs",
    "Hydraulic System Service"
  ];

  const certifications = [
    {
      title: "FAA Part 145 Repair Station",
      number: "Certificate #VWRS145",
      description: "Full authorization for maintenance, preventive maintenance, rebuilding, and alteration"
    },
    {
      title: "Robinson Helicopter Service Center",
      number: "Authorization #RHC-2024",
      description: "Factory authorized service center for all Robinson helicopter models"
    },
    {
      title: "Bell Helicopter Service Facility",
      number: "Authorization #BHT-2024",
      description: "Authorized service facility for Bell helicopter maintenance and repair"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Aircraft <span className="text-orange-500">Maintenance</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Professional helicopter maintenance services ensuring peak performance and safety
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300">
                Schedule Service
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                Emergency Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Maintenance Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Maintenance <span className="text-orange-600">Programs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive maintenance solutions tailored to your aircraft and operational requirements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {maintenancePrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {program.description}
                </p>
                <ul className="space-y-2">
                  {program.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
                Service <span className="text-orange-600">Capabilities</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our state-of-the-art facility and experienced technicians provide comprehensive 
                maintenance services for all types of helicopters, from light single-engine 
                aircraft to heavy turbine-powered machines.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 font-medium">{capability}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Emergency Service Available</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Aircraft on Ground (AOG) situations require immediate attention. 
                  Our emergency response team is available 24/7 to get you back in the air.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>24/7 Emergency Hotline</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Field Service Calls</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Expedited Parts Procurement</span>
                  </div>
                </div>
                <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 w-full">
                  Call Emergency Line: (808) XXX-XXXX
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Certifications & <span className="text-orange-600">Authorizations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our facility maintains the highest industry certifications and manufacturer authorizations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {cert.title}
                </h3>
                <p className="text-orange-600 font-semibold mb-4">
                  {cert.number}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Schedule Your <span className="text-orange-500">Maintenance</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't wait for problems to develop. Schedule your maintenance today and ensure safe, reliable operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Schedule Service
              </button>
              <button className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300">
                Request Quote
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AircraftMaintenance; 