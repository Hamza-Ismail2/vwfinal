import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Project Image Carousel Component
const ProjectImageCarousel = ({ images, title, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (images.length === 1) {
    return (
      <div 
        className="w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => onImageClick && onImageClick(images, title)}
      >
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.parentElement.innerHTML = `
              <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div class="text-center text-gray-500">
                  <div class="text-6xl mb-4">🚁</div>
                  <p class="text-lg font-semibold">Project Image</p>
                </div>
              </div>
            `;
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full group">
      <div 
        className="w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => onImageClick && onImageClick(images, title)}
      >
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={(e) => {
            e.target.parentElement.innerHTML = `
              <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div class="text-center text-gray-500">
                  <div class="text-6xl mb-4">🚁</div>
                  <p class="text-lg font-semibold">Project Image</p>
                </div>
              </div>
            `;
          }}
        />
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

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
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const openImageGallery = (images, title) => {
    setSelectedImages(images);
    setCurrentImageIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );
  };

  // Modal Gallery Component
  const ImageModal = () => {
    if (!modalOpen || selectedImages.length === 0) return null;

    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="relative max-w-4xl max-h-full">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
          >
            ×
          </button>
          
          {/* Image */}
          <img
            src={selectedImages[currentImageIndex]}
            alt={`Project Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          
          {/* Navigation Arrows */}
          {selectedImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {selectedImages.length}
          </div>
        </div>
      </div>
    );
  };

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
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Request Project Consultation
              </Link>
            </motion.div>
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
            <div className="flex justify-center items-center h-40">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-semibold">Loading projects...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center p-8">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-lg font-semibold">{error}</p>
            </div>
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
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Project Images */}
                    <div className="relative h-48 lg:h-auto">
                      {project.images && project.images.length > 0 ? (
                        <ProjectImageCarousel 
                          images={project.images} 
                          title={project.title} 
                          onImageClick={openImageGallery}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <div className="text-6xl mb-4">🚁</div>
                            <p className="text-lg font-semibold">Project Image</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-8">
                      {/* Header */}
                      <div className="mb-6">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Project Details Grid */}
                      <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <h4 className="text-lg font-semibold text-red-600 mb-3 flex items-center">
                            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                            Challenges
                          </h4>
                          <ul className="space-y-2">
                            {project.challenges && project.challenges.slice(0, 3).map((challenge, idx) => (
                              <li key={idx} className="text-sm text-gray-700 leading-relaxed">
                                • {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-blue-600 mb-3 flex items-center">
                            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                            Solutions
                          </h4>
                          <ul className="space-y-2">
                            {project.solutions && project.solutions.slice(0, 3).map((solution, idx) => (
                              <li key={idx} className="text-sm text-gray-700 leading-relaxed">
                                • {solution}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-green-600 mb-3 flex items-center">
                            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                            Outcomes
                          </h4>
                          <ul className="space-y-2">
                            {project.outcomes && project.outcomes.slice(0, 3).map((outcome, idx) => (
                              <li key={idx} className="text-sm text-gray-700 leading-relaxed">
                                • {outcome}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Testimonial */}
                      {project.testimonial && (
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border-l-4 border-orange-500">
                          <div className="flex items-start">
                            <div className="text-orange-500 text-3xl mr-4 flex-shrink-0">"</div>
                            <div>
                              <p className="text-gray-700 italic mb-3 leading-relaxed">
                                {project.testimonial}
                              </p>
                              <div className="text-sm">
                                <p className="font-semibold text-gray-800">
                                  {project.clientContact}
                                </p>
                                <p className="text-orange-600 font-medium">
                                  {project.client}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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

      {/* What Our Customers Say */}
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
              What Our <span className="text-orange-600">Customers Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about their experience with Vertical Worx.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Mark Williams",
                company: "Hawaiian Construction Co.",
                rating: 5,
                review: "Vertical Worx delivered exceptional service during our high-rise construction project. Their attention to safety and precision was outstanding.",
                project: "Construction Support"
              },
              {
                name: "Alex Thompson",
                company: "Pacific Film Productions",
                rating: 5,
                review: "The aerial cinematography work was absolutely stunning. Professional crew, reliable equipment, and perfect execution every time.",
                project: "Film & Media"
              },
              {
                name: "Dr. Emily Davis",
                company: "Hawaii Emergency Services",
                rating: 5,
                review: "In emergency situations, every second counts. Vertical Worx has consistently provided rapid, reliable response when we need it most.",
                project: "Emergency Response"
              },
              {
                name: "Carlos Rodriguez",
                company: "Aloha Agriculture",
                rating: 5,
                review: "Their agricultural support services have been invaluable for our remote farm operations. Professional, efficient, and cost-effective.",
                project: "Agricultural Support"
              },
              {
                name: "Jennifer Kim",
                company: "Island Utilities",
                rating: 5,
                review: "Vertical Worx has been our go-to partner for utility infrastructure projects. Their expertise and reliability are unmatched.",
                project: "Utility Infrastructure"
              },
              {
                name: "Robert Anderson",
                company: "Hawaiian Tourism Board",
                rating: 5,
                review: "The VIP transport services exceeded all expectations. Our guests were impressed with the professionalism and luxury experience.",
                project: "VIP Transport"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 italic mb-4 leading-relaxed flex-grow">
                  "{testimonial.review}"
                </p>

                {/* Project Type */}
                <div className="mb-4">
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {testimonial.project}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-800 mb-1">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action for Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-lg text-gray-600 mb-6">
              Ready to join our satisfied customers?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 inline-block"
              >
                Get Started Today
              </Link>
              <Link
                to="/request-quote"
                className="border-2 border-orange-500 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 inline-block"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
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
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/request-quote"
                  className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
                >
                  Request Project Quote
                </Link>
              </motion.div>
              
              {/* Schedule Consultation button hidden until calendar functionality is ready */}
              {/* <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300">
                  Schedule Consultation
                </button>
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </section>
      <ImageModal />
    </div>
  );
};

export default ProjectsCaseStudies;