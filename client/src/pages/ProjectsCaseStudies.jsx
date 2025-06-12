import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Static data for industry overview and capabilities
const industryProjects = [
  {
    industry: "Construction",
    projects: "45+",
    description: "Heavy-lift operations, material transport, and construction support across Hawaii",
    icon: "🏗️",
    keyProjects: [
      "High-rise construction material delivery",
      "Remote infrastructure development",
      "Bridge construction support",
      "Utility infrastructure installation"
    ]
  },
  {
    industry: "Film & Media",
    projects: "30+",
    description: "Aerial cinematography for films, TV productions, and commercial projects",
    icon: "🎬",
    keyProjects: [
      "Feature film aerial sequences",
      "Tourism commercial productions",
      "Documentary cinematography",
      "Real estate marketing videos"
    ]
  },
  {
    industry: "Agriculture",
    projects: "25+",
    description: "Agricultural support including crop monitoring, transport, and logistics",
    icon: "🌾",
    keyProjects: [
      "Crop monitoring and assessment",
      "Agricultural equipment transport",
      "Remote farm access support",
      "Livestock management assistance"
    ]
  },
  {
    industry: "Emergency Response",
    projects: "60+",
    description: "Search and rescue, medical evacuation, and disaster response operations",
    icon: "🚨",
    keyProjects: [
      "Search and rescue operations",
      "Medical evacuation transport", 
      "Disaster relief logistics",
      "Emergency equipment deployment"
    ]
  }
];

const capabilities = [
  {
    title: "Project Planning & Coordination",
    description: "Comprehensive planning services ensuring mission success",
    features: ["Risk assessment", "Route planning", "Permit coordination", "Timeline development"]
  },
  {
    title: "Specialized Equipment Integration",
    description: "Advanced equipment and systems for complex operations",
    features: ["External load systems", "Camera mount systems", "Scientific instruments", "Communication equipment"]
  },
  {
    title: "Multi-Agency Coordination", 
    description: "Seamless collaboration with various agencies and stakeholders",
    features: ["Government agencies", "Private contractors", "Emergency services", "Research institutions"]
  },
  {
    title: "Safety & Compliance Management",
    description: "Comprehensive safety protocols for all project types",
    features: ["FAA compliance", "Environmental protocols", "Safety training", "Risk mitigation"]
  }
];

const ProjectsCaseStudies = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to fetch projects');
        setProjects(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-orange-500 font-semibold text-lg mb-4">Our Portfolio</h3>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Projects & <span className="text-orange-500">Case Studies</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
              We've supported construction, film, agriculture, and emergency response projects across Hawaii — 
              proving our ability to adapt and deliver on any terrain, in any conditions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Request Project Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Industry Overview */}
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
              Trusted by <span className="text-orange-600">Industry Leaders</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse project portfolio demonstrates our capability to deliver excellence 
              across multiple industries and operational environments throughout Hawaii.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industryProjects.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4 text-center">{industry.icon}</div>
                <div className="text-3xl font-bold text-orange-600 text-center mb-2">
                  {industry.projects}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {industry.industry}
                </h3>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {industry.description}
                </p>
                <ul className="space-y-1">
                  {industry.keyProjects.map((project, idx) => (
                    <li key={idx} className="flex items-center text-xs text-gray-700">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                      {project}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies (from backend) */}
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
              Featured <span className="text-orange-600">Case Studies</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detailed analysis of our most successful missions, demonstrating our problem-solving 
              capabilities and commitment to operational excellence.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-40">Loading...</div>
          ) : error ? (
            <div className="text-red-600 text-center">{error}</div>
          ) : (
            <div className="space-y-12">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="grid lg:grid-cols-3 gap-8 p-8">
                    {/* Project Overview */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center mb-4">
                        <div className="text-3xl mr-4">{project.icon || '🚁'}</div>
                        <div>
                          <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                            {project.category}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      {project.testimonial && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-gray-700 italic mb-3">
                            "{project.testimonial}"
                          </p>
                          <p className="text-sm text-gray-600">
                            — {project.clientContact}
                          </p>
                          <p className="text-sm font-semibold text-orange-600">
                            {project.client}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Project Details */}
                    <div className="lg:col-span-2">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">Challenges</h4>
                          <ul className="space-y-2">
                            {project.challenges && project.challenges.map((challenge, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-700">
                                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">Solutions</h4>
                          <ul className="space-y-2">
                            {project.solutions && project.solutions.map((solution, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-700">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {solution}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">Outcomes</h4>
                          <ul className="space-y-2">
                            {project.outcomes && project.outcomes.map((outcome, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-700">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Capabilities */}
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
              Project <span className="text-orange-600">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive project management and execution capabilities that ensure 
              successful mission completion across diverse operational requirements.
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
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {capability.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {capability.description}
                </p>
                <ul className="space-y-2">
                  {capability.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-xs text-gray-700">
                      <svg className="w-3 h-3 text-orange-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
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

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Whether you need construction support, emergency response, aerial cinematography, or research assistance, 
              our experienced team is ready to deliver customized solutions for your unique requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Request Project Quote
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300"
              >
                Schedule Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsCaseStudies;