import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

// Hook: attaches VanillaTilt to a DOM element for subtle parallax / tilt hover
// Usage: const tiltRef = useMouseTilt({ max: 8, glare: true }); <div ref={tiltRef}>...</div>
const useMouseTilt = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    VanillaTilt.init(node, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      perspective: 800,
      ...options,
    });

    return () => {
      if (node.vanillaTilt) node.vanillaTilt.destroy();
    };
  }, [options]);

  return ref;
};

export default useMouseTilt; 