import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageCarousel3D from '../components/ImageCarousel3D';
import { 
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  StarIcon,
  CogIcon,
  ShieldCheckIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

// Import default background image
import kohCoast from '../images/HI_KOH-COAST_407_001-SHIBSTY-1-scaled.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/images');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && data.data) {
          setGalleryImages(data.data.map(image => {
            const safePath = (() => {
              try {
                const { pathname } = new URL(image.url, window.location.origin);
                return pathname.startsWith('/uploads') ? pathname : `/uploads${pathname}`;
              } catch {
                return '';
              }
            })();
            return {
              id: image._id,
              src: safePath,
              title: image.title,
              description: image.description,
              filename: image.filename,
              originalName: image.originalName,
              contentType: image.contentType,
              size: image.size
            };
          }));
        } else {
          setError('No images found or invalid response format');
        }
      } catch (error) {
        setError(`Failed to load gallery images: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const getImageSrc = (url) => {
    if (!url) return '';
    try {
      const { pathname } = new URL(url, window.location.origin);

      // Already /uploads/… ?  use it  —  otherwise prepend
      return pathname.startsWith('/uploads')
        ? pathname
        : `/uploads${pathname}`;
    } catch {
      return ''; // bad URL → empty
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen flex items-center pt-20">
        <div className="absolute inset-0">
          <img
            src={kohCoast}
            alt="Hawaiian coast aerial view"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-orange-500 font-semibold text-base sm:text-lg mb-4">Our Work</h3>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Gallery of <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">Excellence</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
              Explore our collection of professional helicopter operations, scenic flights, and aerial services 
              across the beautiful Hawaiian Islands. Every image tells a story of precision, safety, and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3D Carousel */}
      {/* <ImageCarousel3D /> */}

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-semibold">Loading gallery images...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <p className="text-red-600 font-semibold text-lg">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {!loading && !error && galleryImages.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="text-gray-400 text-6xl mb-4">📸</div>
                <p className="text-gray-600 font-semibold text-lg">No images found in gallery</p>
              </div>
            </div>
          )}

          {!loading && !error && galleryImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                onClick={() => openModal(image)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    loading="lazy"
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                      <p className="text-sm text-gray-200">{image.description}</p>
                    </div>
                  </div>
                </div>
                              </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
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
              Our Professional <span className="text-orange-500">Portfolio</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Years of experience captured in stunning imagery showcasing our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "2500+", label: "Flight Hours", icon: "🚁" },
              { number: "500+", label: "Projects Completed", icon: "📋" },
              { number: "100+", label: "Satisfied Clients", icon: "⭐" },
              { number: "15+", label: "Years Experience", icon: "🏆" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience Excellence?
            </h2>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Let's discuss your helicopter service needs. Our expert team is ready to make your vision take flight.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 max-w-6xl mx-auto">
              <motion.a
                href="/request-quote"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 flex flex-col items-center"
              >
                <ClipboardDocumentListIcon className="h-8 w-8 mb-2" />
                <span>Request a Quote</span>
              </motion.a>
              
              <motion.a
                href="/contact"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 flex flex-col items-center"
              >
                <ChatBubbleLeftRightIcon className="h-8 w-8 mb-2" />
                <span>Contact Us Today</span>
              </motion.a>
              
              <motion.a
                href="tel:+18089309826"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 flex flex-col items-center"
              >
                <PhoneIcon className="h-8 w-8 mb-2" />
                <span>Call Us Now</span>
              </motion.a>
              
              <motion.a
                href="mailto:info@verticalworx.aero"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 flex flex-col items-center"
              >
                <EnvelopeIcon className="h-8 w-8 mb-2" />
                <span>Email Us Now</span>
              </motion.a>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 flex flex-col items-center cursor-pointer"
                onClick={() => {
                  // Scroll to testimonials section if it exists, or redirect to about page
                  const testimonialsSection = document.getElementById('testimonials');
                  if (testimonialsSection) {
                    testimonialsSection.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/about#testimonials';
                  }
                }}
              >
                <StarIcon className="h-8 w-8 mb-2" />
                <span>Customer Reviews</span>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <p className="text-orange-100 text-lg mb-4">
                <span className="font-semibold">24/7 Emergency Services Available</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-orange-100">
                <div className="flex items-center">
                  <CogIcon className="h-5 w-5 text-orange-300 mr-2" />
                  Professional Pilots
                </div>
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-orange-300 mr-2" />
                  Fully Insured
                </div>
                <div className="flex items-center">
                  <BoltIcon className="h-5 w-5 text-orange-300 mr-2" />
                  Rapid Response
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-full bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full max-h-[80vh] object-contain"
              onError={(e) => {
                console.error('Modal image failed to load:', selectedImage.src);
                e.target.parentElement.innerHTML = `
                  <div class="w-full h-96 bg-gray-100 flex items-center justify-center rounded-t-xl">
                    <div class="text-center">
                      <div class="text-gray-400 text-6xl mb-4">📸</div>
                      <p class="text-gray-500 text-lg">Image not available</p>
                    </div>
                  </div>
                `;
              }}
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600">{selectedImage.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery; 