import React, { useRef, useEffect } from 'react';
import { motion, useViewportScroll } from 'framer-motion';

const JourneyTimeline = ({ milestones = [] }) => {
  const { scrollY } = useViewportScroll();

  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Updates video currentTime based on scroll position inside the section
  useEffect(() => {
    if (!sectionRef.current || !videoRef.current) return;

    const handleUpdate = () => {
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScroll = windowH + sectionRect.height; // distance the section travels through viewport
      const progress = Math.min(Math.max((windowH - sectionRect.top) / totalScroll, 0), 1);

      const vid = videoRef.current;
      if (vid.readyState >= 2 && !isNaN(vid.duration)) {
        vid.currentTime = progress * vid.duration;
      }

      // Fade video in only while section is visible
      vid.style.opacity = progress > 0 && progress < 1 ? 1 : 0;
    };

    // Initial and on-scroll / resize updates
    handleUpdate();
    const unsubscribe = scrollY.onChange(handleUpdate);
    window.addEventListener('resize', handleUpdate);
    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleUpdate);
    };
  }, [scrollY]);

  return (
    <section ref={sectionRef} className="relative h-[250vh] overflow-hidden">
      {/* ————— Helicopter video background ————— */}
      <motion.video
        ref={videoRef}
        src="/videos/parked-helicopter.mp4" // Place your HD video in client/public/videos
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-10 transition-opacity duration-300"
        preload="auto"
        muted
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        controls={false}
        disablePictureInPicture
      />

      {/* ————— Timeline cards ————— */}
      <motion.div
        className="relative z-20 pointer-events-none pt-[120vh] max-w-xl mx-auto space-y-16"
      >
        {milestones.map((m, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="pointer-events-auto bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-6 border-l-4 border-orange-500"
          >
            <h4 className="text-orange-600 font-bold text-lg mb-1">{m.year}</h4>
            <h3 className="text-xl font-semibold mb-2">{m.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{m.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default JourneyTimeline; 