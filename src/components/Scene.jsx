import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';
import CodeParticles from './CodeParticles';

const Scene = ({ currentSection }) => {
  const groupRef = useRef();
  const titleRef = useRef();
  const codeBlockRef = useRef();

  useEffect(() => {
    if (groupRef.current) {
      // Animate the group based on the current section
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2 * (currentSection / 8),
        duration: 1.5,
        ease: 'power3.inOut'
      });

      gsap.to(groupRef.current.position, {
        z: currentSection === 0 ? 0 : -5,
        duration: 1,
        ease: 'power2.out'
      });
    }

    if (titleRef.current) {
      gsap.to(titleRef.current.position, {
        y: currentSection === 0 ? 0 : 8,
        duration: 1,
        ease: 'back.out'
      });

      gsap.to(titleRef.current.material, {
        opacity: currentSection === 0 ? 1 : 0.2,
        duration: 1
      });
    }

    if (codeBlockRef.current) {
      gsap.to(codeBlockRef.current.position, {
        y: currentSection === 2 ? 0 : -10,
        duration: 1,
        ease: 'power2.out'
      });

      gsap.to(codeBlockRef.current.material, {
        opacity: currentSection === 2 ? 1 : 0,
        duration: 1
      });
    }
  }, [currentSection]);

  useFrame((state) => {
    if (titleRef.current) {
      titleRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.003;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Title */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text3D
          ref={titleRef}
          font="/fonts/Inter_Bold.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[0, 0, 0]}
        >
          VIBE CODING
          <meshStandardMaterial
            color="#6e56cf"
            emissive="#6e56cf"
            emissiveIntensity={0.5}
            transparent
            opacity={1}
          />
        </Text3D>
      </Float>

      {/* Code Block */}
      <mesh
        ref={codeBlockRef}
        position={[0, -10, 0]}
      >
        <boxGeometry args={[10, 6, 0.2]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#6e56cf"
          emissiveIntensity={0.2}
          transparent
          opacity={0}
        />
      </mesh>

      {/* Section-specific 3D elements */}
      {currentSection === 1 && (
        <group position={[0, 0, 0]}>
          <mesh position={[-4, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#ff4d4d" wireframe />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#4d4dff" wireframe={false} />
          </mesh>
          <mesh position={[4, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#00c6ff" emissive="#00c6ff" emissiveIntensity={0.5} />
          </mesh>
        </group>
      )}

      {currentSection === 3 && (
        <group position={[0, 0, 0]}>
          <mesh position={[-3, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#00c6ff" emissive="#00c6ff" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[3, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#6e56cf" emissive="#6e56cf" emissiveIntensity={0.3} />
          </mesh>
        </group>
      )}

      {currentSection === 5 && (
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <torusKnotGeometry args={[3, 0.5, 128, 32]} />
            <meshStandardMaterial color="#6e56cf" emissive="#6e56cf" emissiveIntensity={0.3} wireframe />
          </mesh>
        </group>
      )}

      {currentSection === 7 && (
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <octahedronGeometry args={[4, 0]} />
            <meshStandardMaterial
              color="#00c6ff"
              emissive="#00c6ff"
              emissiveIntensity={0.5}
              wireframe
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      )}

      {currentSection === 8 && (
        <group position={[0, 0, 0]}>
          {/* AI Agent Network */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial
              color="#ff6b6b"
              emissive="#ff6b6b"
              emissiveIntensity={0.5}
              wireframe
            />
          </mesh>

          {/* Connection lines */}
          {[[-3, 2, 0], [3, 2, 0], [-3, -2, 0], [3, -2, 0]].map((pos, i) => (
            <group key={i} position={pos}>
              <mesh>
                <sphereGeometry args={[0.5, 16, 16]} />
                <meshStandardMaterial
                  color="#ff6b6b"
                  emissive="#ff6b6b"
                  emissiveIntensity={0.3}
                />
              </mesh>
              <mesh position={[(0 - pos[0])/2, (0 - pos[1])/2, 0]}>
                <cylinderGeometry args={[0.05, 0.05, Math.sqrt(pos[0]*pos[0] + pos[1]*pos[1]), 8]} rotation={[0, 0, Math.atan2(pos[1], pos[0]) - Math.PI/2]} />
                <meshStandardMaterial
                  color="#ff6b6b"
                  emissive="#ff6b6b"
                  emissiveIntensity={0.3}
                />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {currentSection === 9 && (
        <group position={[0, 0, 0]}>
          {/* Tools visualization */}
          <mesh position={[-3, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial
              color="#4ecdc4"
              emissive="#4ecdc4"
              emissiveIntensity={0.3}
            />
          </mesh>

          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial
              color="#4ecdc4"
              emissive="#4ecdc4"
              emissiveIntensity={0.3}
            />
          </mesh>

          <mesh position={[3, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial
              color="#4ecdc4"
              emissive="#4ecdc4"
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Connecting lines */}
          <mesh position={[-1.5, 0, 0]}>
            <boxGeometry args={[3, 0.1, 0.1]} />
            <meshStandardMaterial
              color="#4ecdc4"
              emissive="#4ecdc4"
              emissiveIntensity={0.3}
            />
          </mesh>

          <mesh position={[1.5, 0, 0]}>
            <boxGeometry args={[3, 0.1, 0.1]} />
            <meshStandardMaterial
              color="#4ecdc4"
              emissive="#4ecdc4"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      )}

      {currentSection === 10 && (
        <group position={[0, 0, 0]}>
          {/* Book visualization */}
          <group position={[0, 0, 0]} rotation={[0, time * 0.2, 0]}>
            {/* Book cover */}
            <mesh position={[0, 0, 0.1]} castShadow>
              <boxGeometry args={[4, 5, 0.2]} />
              <meshStandardMaterial
                color="#ffd166"
                emissive="#ffd166"
                emissiveIntensity={0.3}
                roughness={0.7}
              />
            </mesh>

            {/* Book pages */}
            <mesh position={[0, 0, 0.5]} castShadow>
              <boxGeometry args={[3.8, 4.8, 0.8]} />
              <meshStandardMaterial
                color="#f8f8f8"
                roughness={0.5}
              />
            </mesh>

            {/* Book title */}
            <mesh position={[0, 1.5, 0.21]} castShadow>
              <planeGeometry args={[3, 1]} />
              <meshStandardMaterial
                color="#ffd166"
                emissive="#ffd166"
                emissiveIntensity={0.5}
              />
            </mesh>

            {/* Decorative elements */}
            <mesh position={[0, -1.8, 0.21]} castShadow>
              <planeGeometry args={[3, 0.5]} />
              <meshStandardMaterial
                color="#6e56cf"
                emissive="#6e56cf"
                emissiveIntensity={0.5}
              />
            </mesh>
          </group>

          {/* Floating particles around the book */}
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.sin(time * 0.5 + i) * 5,
                Math.cos(time * 0.5 + i * 0.8) * 3,
                Math.sin(time * 0.3 + i * 0.2) * 3
              ]}
            >
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color="#ffd166"
                emissive="#ffd166"
                emissiveIntensity={1}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Code particles for all sections */}
      <CodeParticles count={1000} currentSection={currentSection} />
    </group>
  );
};

export default Scene;
