import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Simple scroll reveal wrapper.  Usage:
// <Reveal><div>...</div></Reveal>
const Reveal = ({ children, delay = 0, duration = 0.6, direction = 'up', distance = 40, ...rest }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration, delay, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Reveal; 