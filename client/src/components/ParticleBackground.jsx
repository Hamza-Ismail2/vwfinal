import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const ParticleBackground = () => {
  return (
    <div className="particles-container">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
};

function ParticleField() {
  const mesh = useRef();
  const light = useRef();

  // Generate random particle positions
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 100;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
      
      // Colors (blue to orange gradient)
      const colorChoice = Math.random();
      if (colorChoice < 0.7) {
        // Blue tones
        colors[i * 3] = 0.2 + Math.random() * 0.3;     // r
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.4; // g
        colors[i * 3 + 2] = 0.9 + Math.random() * 0.1; // b
      } else {
        // Orange tones
        colors[i * 3] = 0.9 + Math.random() * 0.1;     // r
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4; // g
        colors[i * 3 + 2] = 0.1 + Math.random() * 0.2; // b
      }
    }
    
    return [positions, colors];
  }, []);

  // Animation
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Animate individual particles
      const positions = mesh.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.01;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }

    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime) * 20;
      light.current.position.y = Math.cos(state.clock.elapsedTime) * 20;
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight 
        ref={light}
        position={[10, 10, 10]} 
        intensity={0.8} 
        color="#60a5fa" 
      />
      
      {/* Particle system */}
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2000}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={2000}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.3}
          transparent
          opacity={0.4}
          vertexColors
          sizeAttenuation={true}
          alphaTest={0.1}
        />
      </points>
    </>
  );
}

export default ParticleBackground; 