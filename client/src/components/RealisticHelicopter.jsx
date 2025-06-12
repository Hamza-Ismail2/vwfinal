import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function RealisticHelicopter({ position = [0, 0, 0], scale = 1 }) {
  const helicopterRef = useRef();
  const mainRotorRef = useRef();
  const tailRotorRef = useRef();
  const engineRef = useRef();

  // Create realistic materials
  const materials = useMemo(() => ({
    body: new THREE.MeshStandardMaterial({
      color: '#1e40af',
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 1,
    }),
    cockpit: new THREE.MeshStandardMaterial({
      color: '#0ea5e9',
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.7,
    }),
    rotor: new THREE.MeshStandardMaterial({
      color: '#1f2937',
      metalness: 0.9,
      roughness: 0.1,
    }),
    engine: new THREE.MeshStandardMaterial({
      color: '#374151',
      metalness: 0.7,
      roughness: 0.3,
    }),
    skids: new THREE.MeshStandardMaterial({
      color: '#4b5563',
      metalness: 0.8,
      roughness: 0.4,
    }),
    tailBoom: new THREE.MeshStandardMaterial({
      color: '#1e40af',
      metalness: 0.8,
      roughness: 0.3,
    }),
  }), []);

  useFrame((state) => {
    if (helicopterRef.current) {
      // Gentle floating motion
      helicopterRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      helicopterRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      helicopterRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
    }

    // Spinning rotors with realistic speed
    if (mainRotorRef.current) {
      mainRotorRef.current.rotation.y += 0.6;
    }
    if (tailRotorRef.current) {
      tailRotorRef.current.rotation.x += 0.4;
    }

    // Engine vibration effect
    if (engineRef.current) {
      engineRef.current.rotation.y += 0.02;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={helicopterRef} position={position} scale={[scale, scale, scale]}>
        
        {/* Main Fuselage */}
        <group>
          {/* Front fuselage (rounded) */}
          <mesh position={[0, 0, 1.5]}>
            <sphereGeometry args={[1, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
            <primitive object={materials.body} />
          </mesh>
          
          {/* Mid fuselage */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.8, 1, 2.5, 16]} />
            <primitive object={materials.body} />
          </mesh>
          
          {/* Rear fuselage transition */}
          <mesh position={[0, 0, -1.5]} rotation={[0, 0, 0]}>
            <coneGeometry args={[0.8, 1.5, 12]} />
            <primitive object={materials.body} />
          </mesh>
        </group>

        {/* Cockpit Canopy */}
        <group>
          {/* Main cockpit bubble */}
          <mesh position={[0, 0.3, 1.8]}>
            <sphereGeometry args={[0.9, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            <primitive object={materials.cockpit} />
          </mesh>
          
          {/* Side windows */}
          <mesh position={[0.7, 0.2, 1.2]} rotation={[0, 0.3, 0]}>
            <planeGeometry args={[1.2, 0.8]} />
            <primitive object={materials.cockpit} />
          </mesh>
          <mesh position={[-0.7, 0.2, 1.2]} rotation={[0, -0.3, 0]}>
            <planeGeometry args={[1.2, 0.8]} />
            <primitive object={materials.cockpit} />
          </mesh>
        </group>

        {/* Engine Housing */}
        <group ref={engineRef}>
          <mesh position={[0, 1, 0.5]}>
            <cylinderGeometry args={[0.4, 0.5, 1.2, 8]} />
            <primitive object={materials.engine} />
          </mesh>
          
          {/* Engine exhaust */}
          <mesh position={[0.3, 0.8, -0.2]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.1, 0.15, 0.6, 6]} />
            <primitive object={materials.engine} />
          </mesh>
          <mesh position={[-0.3, 0.8, -0.2]} rotation={[0, 0, -Math.PI / 6]}>
            <cylinderGeometry args={[0.1, 0.15, 0.6, 6]} />
            <primitive object={materials.engine} />
          </mesh>
        </group>

        {/* Main Rotor System */}
        <group>
          {/* Rotor mast */}
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.6]} />
            <primitive object={materials.rotor} />
          </mesh>
          
          {/* Rotor hub */}
          <mesh position={[0, 1.7, 0]}>
            <sphereGeometry args={[0.2, 8, 6]} />
            <primitive object={materials.rotor} />
          </mesh>
          
          {/* Main rotor blades */}
          <group ref={mainRotorRef} position={[0, 1.8, 0]}>
            {/* Blade 1 */}
            <mesh position={[3.5, 0, 0]} rotation={[0, 0, Math.PI / 24]}>
              <boxGeometry args={[7, 0.08, 0.25]} />
              <primitive object={materials.rotor} />
            </mesh>
            {/* Blade tip weight */}
            <mesh position={[6.8, 0, 0]}>
              <sphereGeometry args={[0.1, 6, 4]} />
              <primitive object={materials.rotor} />
            </mesh>
            
            {/* Blade 2 */}
            <mesh position={[-3.5, 0, 0]} rotation={[0, 0, -Math.PI / 24]}>
              <boxGeometry args={[7, 0.08, 0.25]} />
              <primitive object={materials.rotor} />
            </mesh>
            {/* Blade tip weight */}
            <mesh position={[-6.8, 0, 0]}>
              <sphereGeometry args={[0.1, 6, 4]} />
              <primitive object={materials.rotor} />
            </mesh>
          </group>
        </group>

        {/* Tail Boom */}
        <group>
          <mesh position={[0, 0.1, -3]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.25, 0.4, 4]} />
            <primitive object={materials.tailBoom} />
          </mesh>
          
          {/* Tail boom fairing */}
          <mesh position={[0, 0.3, -2]}>
            <boxGeometry args={[0.3, 0.6, 2]} />
            <primitive object={materials.tailBoom} />
          </mesh>
        </group>

        {/* Tail Assembly */}
        <group>
          {/* Vertical stabilizer */}
          <mesh position={[0, 0.8, -4.5]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.1, 1.4, 0.8]} />
            <primitive object={materials.body} />
          </mesh>
          
          {/* Horizontal stabilizer */}
          <mesh position={[0, 0.2, -4.8]} rotation={[0, 0, 0]}>
            <boxGeometry args={[1.2, 0.1, 0.6]} />
            <primitive object={materials.body} />
          </mesh>
          
          {/* Tail rotor guard */}
          <mesh position={[0.9, 0.5, -4.2]}>
            <torusGeometry args={[0.6, 0.02, 8, 16]} />
            <primitive object={materials.rotor} />
          </mesh>
        </group>

        {/* Tail Rotor */}
        <group ref={tailRotorRef} position={[0.9, 0.5, -4.2]} rotation={[0, 0, Math.PI / 2]}>
          {/* Rotor hub */}
          <mesh>
            <sphereGeometry args={[0.08, 6, 4]} />
            <primitive object={materials.rotor} />
          </mesh>
          
          {/* Tail rotor blades */}
          <mesh position={[0.4, 0, 0]}>
            <boxGeometry args={[0.8, 0.04, 0.12]} />
            <primitive object={materials.rotor} />
          </mesh>
          <mesh position={[-0.4, 0, 0]}>
            <boxGeometry args={[0.8, 0.04, 0.12]} />
            <primitive object={materials.rotor} />
          </mesh>
          <mesh position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.8, 0.04, 0.12]} />
            <primitive object={materials.rotor} />
          </mesh>
          <mesh position={[0, -0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[0.8, 0.04, 0.12]} />
            <primitive object={materials.rotor} />
          </mesh>
        </group>

        {/* Landing Skids */}
        <group>
          {/* Left skid */}
          <mesh position={[1, -0.9, 0.5]}>
            <boxGeometry args={[0.2, 0.15, 3]} />
            <primitive object={materials.skids} />
          </mesh>
          {/* Left skid cross tubes */}
          <mesh position={[0.8, -0.7, 1.5]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.03, 0.03, 0.6]} />
            <primitive object={materials.skids} />
          </mesh>
          <mesh position={[0.8, -0.7, -0.5]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.03, 0.03, 0.6]} />
            <primitive object={materials.skids} />
          </mesh>
          
          {/* Right skid */}
          <mesh position={[-1, -0.9, 0.5]}>
            <boxGeometry args={[0.2, 0.15, 3]} />
            <primitive object={materials.skids} />
          </mesh>
          {/* Right skid cross tubes */}
          <mesh position={[-0.8, -0.7, 1.5]} rotation={[0, 0, -Math.PI / 6]}>
            <cylinderGeometry args={[0.03, 0.03, 0.6]} />
            <primitive object={materials.skids} />
          </mesh>
          <mesh position={[-0.8, -0.7, -0.5]} rotation={[0, 0, -Math.PI / 6]}>
            <cylinderGeometry args={[0.03, 0.03, 0.6]} />
            <primitive object={materials.skids} />
          </mesh>
        </group>

        {/* Details */}
        <group>
          {/* Navigation lights */}
          <mesh position={[0, 0.5, 2.2]}>
            <sphereGeometry args={[0.05, 6, 4]} />
            <meshBasicMaterial color="#ff0000" />
          </mesh>
          <mesh position={[0.8, 0, 1]}>
            <sphereGeometry args={[0.03, 6, 4]} />
            <meshBasicMaterial color="#00ff00" />
          </mesh>
          <mesh position={[-0.8, 0, 1]}>
            <sphereGeometry args={[0.03, 6, 4]} />
            <meshBasicMaterial color="#ff0000" />
          </mesh>
          
          {/* Antenna */}
          <mesh position={[0, 1.2, -1]} rotation={[Math.PI / 4, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.4]} />
            <primitive object={materials.rotor} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export default RealisticHelicopter; 