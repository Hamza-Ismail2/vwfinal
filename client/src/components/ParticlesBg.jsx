import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticlesBg = ({ className = '' }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles-bg"
      init={particlesInit}
      className={className}
      options={{
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 40, density: { enable: true, area: 800 } },
          color: { value: '#ffffff' },
          opacity: { value: 0.15 },
          size: { value: { min: 1, max: 3 } },
          move: { enable: true, speed: 0.2 },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBg; 