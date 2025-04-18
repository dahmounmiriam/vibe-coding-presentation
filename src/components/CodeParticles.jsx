import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CodeParticles = ({ count = 1000, currentSection }) => {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate random positions for particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 10;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      temp.push({ 
        position: [x, y, z],
        scale: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02 + 0.01
      });
    }
    return temp;
  }, [count]);
  
  useFrame((state) => {
    if (mesh.current) {
      particles.forEach((particle, i) => {
        const { position, scale, speed } = particle;
        
        // Calculate new position based on time
        const time = state.clock.elapsedTime;
        const [x, y, z] = position;
        
        // Different movement patterns based on section
        let newX = x;
        let newY = y;
        let newZ = z;
        
        if (currentSection === 0) {
          // Spiral inward
          const angle = time * speed;
          const radius = Math.max(5, 10 - time * 0.1);
          newX = Math.cos(angle + i) * radius;
          newY = Math.sin(angle + i) * radius;
          newZ = z + Math.sin(time * 0.5) * 0.2;
        } else if (currentSection === 2) {
          // Code flow pattern
          newY = ((y + time * speed) % 20) - 10;
          newX = x + Math.sin(time * 0.2 + i) * 0.05;
        } else if (currentSection === 6) {
          // Demo pattern - particles form a sphere
          const pulseRadius = 5 + Math.sin(time) * 2;
          const angle = time * speed;
          newX = Math.cos(angle * 2 + i) * pulseRadius;
          newY = Math.sin(angle * 3 + i) * pulseRadius;
          newZ = Math.cos(angle * 5 + i * 0.3) * pulseRadius;
        } else {
          // Default gentle floating
          newX = x + Math.sin(time * 0.1 + i) * 0.03;
          newY = y + Math.cos(time * 0.1 + i * 0.5) * 0.03;
          newZ = z + Math.sin(time * 0.1 + i * 0.2) * 0.03;
        }
        
        // Set the position and scale of the dummy object
        dummy.position.set(newX, newY, newZ);
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        
        // Apply the matrix to the instanced mesh
        mesh.current.setMatrixAt(i, dummy.matrix);
      });
      
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });
  
  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial 
        color="#00c6ff" 
        emissive="#00c6ff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
};

export default CodeParticles;
