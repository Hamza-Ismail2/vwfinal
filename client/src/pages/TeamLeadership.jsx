import React from 'react';
import { motion } from 'framer-motion';
import teamBackground from '../images/IMG_7075-scaled.jpg';
import pilotTeam from '../images/IMG_7065-scaled.jpg';
import operationsTeam from '../images/L1030042-2-1-scaled-1-1366x2048.jpg';

const TeamLeadership = () => {
  const leadershipValues = [
    {
      title: "Veteran Leadership",
      description: "Military precision and discipline combined with local expertise delivers dependable, versatile, and safe helicopter services.",
      icon: "⭐",
      principles: [
        "Mission-first mentality",
        "Attention to detail", 
        "Continuous improvement",
        "Team accountability"
      ]
    },
    {
      title: "Expert Pilots",
      description: "Our experienced pilots and crew bring years of specialized training and mission-ready focus to every operation.",
      icon: "👨‍✈️",
      principles: [
        "Commercial licenses",
        "Instrument ratings",
        "Type certifications",
        "Recurrent training"
      ]
    },
    {
      title: "Local Knowledge",
      description: "Deep understanding of Hawaiian Islands terrain, weather patterns, and regulations gives us unmatched operational capabilities.",
      icon: "🌺",
      principles: [
        "Island terrain expertise",
        "Weather pattern knowledge",
        "Regulatory compliance",
        "Cultural awareness"
      ]
    },
    {
      title: "Safety Excellence", 
      description: "We operate under rigorous FAA certifications and strict protocols to ensure every mission meets the highest safety standards.",
      icon: "🛡️",
      principles: [
        "Zero-incident goal",
        "Continuous training",
        "Equipment maintenance",
        "Protocol adherence"
      ]
    }
  ];

  const teamExpertise = [
    {
      department: "Flight Operations",
      description: "Experienced pilots with military and civilian aviation backgrounds",
      icon: "✈️",
      capabilities: [
        "Multi-engine helicopter operations",
        "Instrument flight proficiency",
        "External load operations expertise", 
        "Emergency response training",
        "Mountain and maritime operations",
        "Night vision operations"
      ],
      certifications: ["Commercial Pilot License", "Instrument Rating", "Type Ratings", "Flight Instructor Certificates"]
    },
    {
      department: "Maintenance & Engineering",
      description: "Certified technicians ensuring aircraft airworthiness and reliability",
      icon: "🔧",
      capabilities: [
        "Airframe and powerplant maintenance",
        "Avionics systems support",
        "Emergency repair capabilities",
        "Progressive maintenance programs",
        "Parts and supply management",
        "Quality assurance protocols"
      ],
      certifications: ["A&P Licenses", "Avionics Certifications", "Manufacturer Training", "Quality Control Systems"]
    },
    {
      department: "Operations Management",
      description: "Logistics and coordination specialists managing complex operations",
      icon: "📋",
      capabilities: [
        "Mission planning and coordination",
        "Risk assessment and management",
        "Permit and regulatory compliance",
        "Customer service excellence",
        "Resource allocation optimization",
        "Emergency response coordination"
      ],
      certifications: ["Project Management", "Safety Management", "Regulatory Compliance", "Emergency Response"]
    },
    {
      department: "Ground Support",
      description: "Skilled ground crew ensuring safe and efficient operations",
      icon: "👷",
      capabilities: [
        "Aircraft handling and positioning",
        "Fuel services and management",
        "Load preparation and rigging",
        "Communication support",
        "Safety equipment management",
        "Emergency response procedures"
      ],
      certifications: ["Ground Handling Certification", "Safety Training", "Equipment Operation", "Emergency Response"]
    }
  ];

  const coreValues = [
    {
      value: "Integrity",
      description: "Honest, transparent communication and ethical practices in all operations and client interactions.",
      icon: "🤝"
    },
    {
      value: "Excellence",
      description: "Commitment to exceeding client expectations through superior service delivery and operational performance.",
      icon: "🏆"
    },
    {
      value: "Safety",
      description: "Uncompromising commitment to safety in every operation, from pre-flight planning to mission completion.",
      icon: "🛡️"
    },
    {
      value: "Innovation",
      description: "Continuous pursuit of technological advancement and operational improvement to serve our clients better.",
      icon: "💡"
    },
    {
      value: "Service",
      description: "Dedication to serving our community, clients, and industry with professionalism and reliability.",
      icon: "🎯"
    },
    {
      value: "Teamwork",
      description: "Collaborative approach to problem-solving and mission execution, leveraging diverse expertise and experience.",
      icon: "👥"
    }
  ];

  const recognitions = [
    {
      achievement: "100% Safety Record",
      description: "Perfect operational safety record maintained throughout company history",
      icon: "🛡️"
    },
    {
      achievement: "Industry Recognition",
      description: "Recognized as Hawaii's premier helicopter service provider by industry peers",
      icon: "🏆"
    },
    {
      achievement: "Client Satisfaction",
      description: "100+ satisfied clients across construction, media, research, and emergency services",
      icon: "⭐"
    },
    {
      achievement: "Community Impact",
      description: "Significant contribution to Hawaii's emergency response and infrastructure development",
      icon: "🌺"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={teamBackground}
            alt="Professional helicopter team"
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
            <h3 className="text-orange-500 font-semibold text-lg mb-4">Our People</h3>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Team & <span className="text-orange-500">Leadership</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
              Locally owned and veteran-operated, our team combines military-grade discipline with local expertise 
              to deliver dependable, versatile, and safe helicopter services across Hawaii.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Team
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Leadership Philosophy */}
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
              Leadership <span className="text-orange-600">Philosophy</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our veteran-operated leadership brings military precision, discipline, and commitment 
              to civilian helicopter operations throughout the Hawaiian Islands.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {value.description}
                </p>
                <ul className="space-y-1">
                  {value.principles.map((principle, idx) => (
                    <li key={idx} className="flex items-center text-xs text-gray-700">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                      {principle}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Expertise */}
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
              Team <span className="text-orange-600">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced pilots and crew bring years of specialized training and mission-ready focus 
              to every operation. We're problem-solvers in the air, trusted by industries across the islands.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {teamExpertise.map((team, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">{team.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {team.department}
                    </h3>
                    <p className="text-gray-600">
                      {team.description}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Core Capabilities:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {team.capabilities.map((capability, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {capability}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Key Certifications:</h4>
                  <div className="flex flex-wrap gap-2">
                    {team.certifications.map((cert, idx) => (
                      <span key={idx} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team in Action Gallery */}
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
              Our Team in <span className="text-orange-500">Action</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet the professionals behind every successful mission - dedicated, experienced, and committed to excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={pilotTeam}
                alt="Professional pilots and crew"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h4 className="text-white font-semibold text-lg">Flight Operations</h4>
                <p className="text-gray-200 text-sm">Experienced pilots and crew</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={operationsTeam}
                alt="Operations and maintenance team"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h4 className="text-white font-semibold text-lg">Ground Operations</h4>
                <p className="text-gray-200 text-sm">Maintenance and support crew</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1"
            >
              <img
                src={teamBackground}
                alt="Team leadership and management"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h4 className="text-white font-semibold text-lg">Leadership Team</h4>
                <p className="text-gray-200 text-sm">Management and coordination</p>
              </div>
            </motion.div>
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
              Our Core <span className="text-orange-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision, drive our commitment to excellence, 
              and define our approach to serving clients and community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {value.value}
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition & Achievements */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Recognition & Achievements
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Our team's dedication to excellence has earned recognition throughout Hawaii's aviation industry 
              and the trust of clients across multiple sectors.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recognitions.map((recognition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{recognition.icon}</div>
                <h3 className="text-xl font-bold mb-3">
                  {recognition.achievement}
                </h3>
                <p className="text-white/90 text-sm">
                  {recognition.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Elite Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              We're always looking for experienced aviation professionals who share our commitment 
              to safety, excellence, and service. Be part of Hawaii's premier helicopter service team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Career Opportunities
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Contact HR Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TeamLeadership; 