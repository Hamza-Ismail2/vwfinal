import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const openPositions = [
    {
      id: 1,
      title: "Commercial Helicopter Pilot",
      department: "flight-ops",
      location: "Kailua-Kona, HI",
      type: "Full-time",
      experience: "1,500+ hours",
      description: "Seeking experienced helicopter pilots for VIP transport and tour operations across Hawaiian Islands.",
      requirements: [
        "Commercial Pilot License (CPL) with Rotorcraft Category",
        "Minimum 1,500 total flight hours",
        "500+ hours helicopter time",
        "Clean driving record and background check",
        "Excellent communication skills",
        "Customer service oriented"
      ],
      preferred: [
        "Robinson R44/R66 experience",
        "Part 135 experience",
        "Hawaiian Islands flying experience",
        "Instrument rating",
        "CFI rating"
      ],
      benefits: [
        "Competitive salary + performance bonuses",
        "Health, dental, vision insurance",
        "Retirement plan with company match",
        "Paid time off and holidays",
        "Ongoing training and development",
        "Career advancement opportunities"
      ]
    },
    {
      id: 2,
      title: "A&P Mechanic - Helicopters",
      department: "maintenance",
      location: "Kailua-Kona, HI",
      type: "Full-time",
      experience: "3+ years",
      description: "Join our maintenance team providing world-class helicopter maintenance services.",
      requirements: [
        "FAA Airframe & Powerplant (A&P) License",
        "Minimum 3 years helicopter maintenance experience",
        "Experience with Robinson, Bell, or Airbus helicopters",
        "Ability to work independently and in teams",
        "Strong attention to detail",
        "Physical ability to lift 50+ lbs"
      ],
      preferred: [
        "Inspection Authorization (IA)",
        "Avionics experience",
        "Part 145 repair station experience",
        "Turbine engine experience",
        "Hawaiian operations experience"
      ],
      benefits: [
        "Competitive hourly rate",
        "Overtime opportunities",
        "Health benefits package",
        "Tool allowance",
        "Continuing education support",
        "Stable work environment"
      ]
    },
    {
      id: 3,
      title: "Flight Instructor (CFI)",
      department: "training",
      location: "Kailua-Kona, HI",
      type: "Full-time",
      experience: "500+ hours instruction",
      description: "Teach the next generation of helicopter pilots in our professional training program.",
      requirements: [
        "CFI-H (Helicopter) certificate",
        "Minimum 500 hours flight instruction given",
        "Commercial Pilot License",
        "Clean record with FAA",
        "Strong teaching and communication skills",
        "Passion for aviation education"
      ],
      preferred: [
        "CFII (Instrument Instructor)",
        "Robinson R22/R44 instructor endorsements",
        "Ground instructor certificates",
        "College degree in aviation or related field",
        "Previous training center experience"
      ],
      benefits: [
        "Base salary plus hourly instruction rate",
        "Performance bonuses",
        "Professional development opportunities",
        "Health insurance",
        "Flexible scheduling",
        "Career growth potential"
      ]
    },
    {
      id: 4,
      title: "Operations Coordinator",
      department: "operations",
      location: "Kailua-Kona, HI",
      type: "Full-time",
      experience: "2+ years",
      description: "Coordinate flight operations, scheduling, and customer service for our busy helicopter operation.",
      requirements: [
        "Bachelor's degree or equivalent experience",
        "2+ years aviation operations experience",
        "Strong organizational and communication skills",
        "Proficiency in scheduling software",
        "Customer service experience",
        "Ability to work under pressure"
      ],
      preferred: [
        "Part 135 operations experience",
        "Helicopter operations background",
        "Multi-language capabilities",
        "Emergency response experience",
        "Hawaii local knowledge"
      ],
      benefits: [
        "Competitive salary",
        "Performance bonuses",
        "Full benefits package",
        "Paid training",
        "Career advancement",
        "Work-life balance"
      ]
    },
    {
      id: 5,
      title: "Marketing Specialist",
      department: "admin",
      location: "Kailua-Kona, HI",
      type: "Full-time",
      experience: "2+ years",
      description: "Drive marketing initiatives for our growing helicopter services company.",
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "2+ years marketing experience",
        "Digital marketing expertise",
        "Content creation skills",
        "Social media management",
        "Analytics and reporting abilities"
      ],
      preferred: [
        "Aviation industry experience",
        "Photography/videography skills",
        "SEO/SEM knowledge",
        "Tourism industry background",
        "Hawaii market knowledge"
      ],
      benefits: [
        "Competitive salary",
        "Creative work environment",
        "Professional development",
        "Health benefits",
        "Flexible work arrangements",
        "Growth opportunities"
      ]
    }
  ];

  const departments = [
    { value: 'all', label: 'All Departments', count: openPositions.length },
    { value: 'flight-ops', label: 'Flight Operations', count: openPositions.filter(p => p.department === 'flight-ops').length },
    { value: 'maintenance', label: 'Maintenance', count: openPositions.filter(p => p.department === 'maintenance').length },
    { value: 'training', label: 'Training', count: openPositions.filter(p => p.department === 'training').length },
    { value: 'operations', label: 'Operations', count: openPositions.filter(p => p.department === 'operations').length },
    { value: 'admin', label: 'Administration', count: openPositions.filter(p => p.department === 'admin').length }
  ];

  const benefits = [
    {
      icon: "💰",
      title: "Competitive Compensation",
      description: "Industry-leading salaries with performance bonuses and profit sharing opportunities"
    },
    {
      icon: "🏥",
      title: "Comprehensive Benefits",
      description: "Full health, dental, vision insurance plus life insurance and disability coverage"
    },
    {
      icon: "📚",
      title: "Professional Development",
      description: "Ongoing training, certification support, and career advancement opportunities"
    },
    {
      icon: "🏖️",
      title: "Work-Life Balance",
      description: "Generous PTO, flexible scheduling, and the beautiful Hawaiian Islands as your office"
    },
    {
      icon: "🚁",
      title: "Aviation Excellence",
      description: "Work with state-of-the-art aircraft and cutting-edge aviation technology"
    },
    {
      icon: "🤝",
      title: "Team Culture",
      description: "Veteran-operated company with military precision and civilian innovation"
    }
  ];

  const filteredPositions = selectedDepartment === 'all' 
    ? openPositions 
    : openPositions.filter(position => position.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Join Our <span className="text-orange-500">Team</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Build your aviation career with Hawaii's premier helicopter service provider. 
                When it's done right, it just WORX.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#positions"
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-center"
                >
                  View Open Positions
                </a>
                <a
                  href="mailto:careers@wvx.aero"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 text-center"
                >
                  Submit Resume
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Why Choose Vertical Worx?</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Industry-leading compensation and benefits</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Professional development and training</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Work in paradise - Hawaiian Islands</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-6 h-6 text-orange-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Veteran-operated with strong values</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Benefits */}
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
              Why Work With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a team that values excellence, safety, and professional growth in the aviation industry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore current opportunities to join our growing team
            </p>
          </motion.div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {departments.map((dept) => (
              <button
                key={dept.value}
                onClick={() => setSelectedDepartment(dept.value)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedDepartment === dept.value
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {dept.label} ({dept.count})
              </button>
            ))}
          </div>

          {/* Position Cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredPositions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                          {position.type}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {position.location}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                          {position.experience}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {position.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Requirements:</h4>
                      <ul className="space-y-1">
                        {position.requirements.slice(0, 3).map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {req}
                          </li>
                        ))}
                        {position.requirements.length > 3 && (
                          <li className="text-sm text-gray-500 ml-6">
                            +{position.requirements.length - 3} more requirements
                          </li>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Benefits Include:</h4>
                      <ul className="space-y-1">
                        {position.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => window.location.href = 'mailto:careers@wvx.aero?subject=Application for ' + position.title}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Apply Now
                    </button>
                    <button 
                      onClick={() => window.location.href = '/contact'}
                      className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 transition-all duration-300"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPositions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                No positions found
              </h3>
              <p className="text-gray-600 mb-8">
                No current openings in the selected department. Check back soon or submit your resume for future opportunities.
              </p>
              <button
                onClick={() => setSelectedDepartment('all')}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
              >
                View All Positions
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
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
              Application Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined hiring process ensures we find the right fit for both candidates and our team
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Submit Application",
                description: "Apply online or email your resume and cover letter to careers@wvx.aero"
              },
              {
                step: "2",
                title: "Initial Review",
                description: "Our team reviews your qualifications and experience within 48 hours"
              },
              {
                step: "3",
                title: "Interview Process",
                description: "Phone/video screening followed by in-person interview and skills assessment"
              },
              {
                step: "4",
                title: "Welcome Aboard",
                description: "Background check, orientation, and comprehensive training program"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact HR */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Take Flight With Us?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Don't see the perfect position? We're always looking for exceptional talent 
              to join our team. Submit your resume for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@wvx.aero"
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email careers@wvx.aero
              </a>
              <a
                href="tel:+18089309826"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-800 transition-all duration-300 inline-flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call (808) 555-1234
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers; 