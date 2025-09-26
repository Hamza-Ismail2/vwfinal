import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, PaperAirplaneIcon, ShieldCheckIcon, ClockIcon, StarIcon, RocketLaunchIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import helicopterFleet from '../images/Bell-407-Hughes-500-Flight-over-Old-Flow.jpg';
import vipArrival from '../images/kahua-VIP-arrival-scaled.jpg';
import helicopterAction from '../images/IMG_7065-scaled.jpg';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    {
      number: "15+",
      label: "Years of Experience",
      icon: TrophyIcon
    },
    {
      number: "2,500+",
      label: "Successful Flights",
      icon: PaperAirplaneIcon
    },
    {
      number: "100%",
      label: "Safety Record",
      icon: ShieldCheckIcon
    },
    {
      number: "24/7",
      label: "Availability",
      icon: ClockIcon
    }
  ];


  const values = [
    {
      title: "Safety First",
      description: "Our unwavering commitment to safety drives every decision we make",
      icon: ShieldCheckIcon,
      color: "from-red-500 to-red-700"
    },
    {
      title: "Excellence",
      description: "We strive for perfection in every aspect of our service",
      icon: StarIcon,
      color: "from-yellow-500 to-yellow-700"
    },
    {
      title: "Innovation",
      description: "Embracing cutting-edge technology and best practices",
      icon: RocketLaunchIcon,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Integrity",
      description: "Honest, transparent, and ethical in all our operations",
      icon: HandThumbUpIcon,
      color: "from-green-500 to-green-700"
    }
  ];

  const milestones = [
    {
      year: "2008",
      title: "Company Founded",
      description: "Started with a single helicopter and a vision for excellence"
    },
    {
      year: "2012",
      title: "Fleet Expansion",
      description: "Added our first luxury helicopter for VIP services"
    },
    {
      year: "2016",
      title: "Medical Certification",
      description: "Obtained medical transport certification for emergency services"
    },
    {
      year: "2020",
      title: "Technology Integration",
      description: "Implemented advanced navigation and safety systems"
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description: "Awarded Best Helicopter Service Provider by Aviation Excellence"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
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
            About <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Vertical Worx</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            With over 15 years of excellence in aviation, we are your trusted partner for safe, 
            reliable, and luxurious helicopter services.
          </p>
        </motion.div>

        {/* Company Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Our Story
                </h3>
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                  <p>
                    Founded in 2008 by a team of passionate aviation professionals, Vertical Worx 
                    began with a simple mission: to provide uncompromising safety, exceptional service, 
                    and unforgettable experiences in the skies.
                  </p>
                  <p>
                    What started as a small operation with a single helicopter has grown into one of 
                    the region's most trusted helicopter service providers. Our commitment to excellence 
                    has earned us the loyalty of countless clients and numerous industry accolades.
                  </p>
                  <p>
                    Today, we operate a modern fleet of state-of-the-art helicopters, maintained to 
                    the highest standards and piloted by some of the most experienced aviators in the industry.
                  </p>
                </div>
              </div>
              
              <div className="relative mt-6 lg:mt-0">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={helicopterFleet}
                    alt="Fleet of helicopters in flight"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                    <h4 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3">Our Mission</h4>
                    <p className="text-blue-100 leading-relaxed text-sm sm:text-base">
                      To deliver exceptional helicopter services that exceed expectations while 
                      maintaining the highest standards of safety, professionalism, and customer satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <stat.icon className="w-10 h-10 mx-auto mb-4 text-orange-500" />
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm lg:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg p-6 lg:p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Operations
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See our helicopters in action across various missions and services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={vipArrival}
                alt="VIP helicopter arrival service"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h4 className="text-white font-semibold text-lg">VIP Services</h4>
                <p className="text-gray-200 text-sm">Luxury transport and arrivals</p>
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
                src={helicopterAction}
                alt="Helicopter in operational service"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h4 className="text-white font-semibold text-lg">Operations</h4>
                <p className="text-gray-200 text-sm">Professional flight operations</p>
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
                src={helicopterFleet}
                alt="Helicopter fleet operations"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h4 className="text-white font-semibold text-lg">Fleet Operations</h4>
                <p className="text-gray-200 text-sm">Multiple aircraft coordination</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-20"
        >
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h3>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Key milestones in our commitment to excellence
            </p>
          </div>

          <div className="relative px-4 md:px-0">
            {/* Timeline line - responsive positioning */}
            <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-0.5 md:w-1 h-full bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>

            <div className="space-y-6 md:space-y-8 lg:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-center"
                >
                  {/* Timeline dot - perfectly centered on the line */}
                  <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 z-10 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-lg"></div>

                  {/* Content layout for different screen sizes */}
                  <div className={`w-full flex ${index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'} justify-start`}>
                    {/* Content card */}
                    <div className={`w-full md:w-5/6 lg:w-2/5 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto lg:mr-16' : 'md:ml-auto lg:ml-16'}`}>
                      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-orange-500 font-bold text-base md:text-lg mb-2">
                          {milestone.year}
                        </div>
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                          {milestone.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Experience Excellence?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us with their aerial transportation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact">
                <button className="bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 min-w-[200px]">
                  Contact Us Today
                </button>
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-500 transition-all duration-300 min-w-[200px]">
                View Our Fleet
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 