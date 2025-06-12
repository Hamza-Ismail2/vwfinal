import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import helicopterImage1 from '../images/HI_KOH-COAST_407_001-SHIBSTY-1-scaled.jpg';
import helicopterImage2 from '../images/Bell-407-Hughes-500-Flight-over-Old-Flow.jpg';
import helicopterImage3 from '../images/Oahu-Magnum-Experience-over-water-scaled.jpg';
import helicopterImage4 from '../images/kahua-VIP-arrival-scaled.jpg';
import helicopterImage5 from '../images/IMG_7065-scaled.jpg';

// Simplified helicopter component for demo
const RealisticHelicopter = ({ position, scale }) => {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[2, 0.5, 0.5]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[6, 0.02, 0.2]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    </group>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  
  const helicopterImages = [
    { src: helicopterImage1, alt: "Helicopter flying over Hawaiian coast" },
    { src: helicopterImage2, alt: "Fleet of helicopters in formation" },
    { src: helicopterImage3, alt: "Helicopter over water scenic tour" },
    { src: helicopterImage4, alt: "VIP helicopter arrival service" },
    { src: helicopterImage5, alt: "Professional helicopter operations" }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleContactUsClick = () => {
    const contactSection = document.querySelector('#contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === helicopterImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [helicopterImages.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 lg:pt-36">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={helicopterImages[currentImageIndex].src}
            alt={helicopterImages[currentImageIndex].alt}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {helicopterImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-orange-500 scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [8, 4, 8], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, 10, -10]} intensity={0.5} color="#f97316" />
            
            <RealisticHelicopter position={[0, 0, 0]} scale={0.6} />
            
            <Environment preset="sunset" />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4 sm:px-6 max-w-6xl mx-auto py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-4 sm:mb-6"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
            <span className="text-white">When it's done right,</span><br />
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">it just WORX.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-4 sm:mb-6"
        >
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-2 sm:mb-3">
            Precision Aviation Services Across
          </h2>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Hawaiian Islands
          </h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed"
        >
          Locally owned and veteran-operated, Vertical Worx delivers comprehensive 
          Helicopter Services with unmatched professionalism and safety.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-lg mx-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[180px]"
          >
            Watch Video
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContactUsClick}
            className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-orange-500 transition-all duration-300 min-w-[180px]"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;