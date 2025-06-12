import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-dark-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated helicopter icon */}
        <motion.div
          animate={{ 
            rotate: 360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="text-6xl mb-8"
        >
          🚁
        </motion.div>
        
        {/* Loading text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold gradient-text mb-4"
        >
          Preparing for Takeoff
        </motion.h2>
        
        {/* Animated dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-3 h-3 bg-primary-500 rounded-full"
            />
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-dark-700 rounded-full overflow-hidden mx-auto">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full w-1/3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
          />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-dark-300 text-sm mt-4"
        >
          Loading your helicopter experience...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 