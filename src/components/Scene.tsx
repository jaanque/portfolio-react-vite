// src/components/Scene.tsx
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;

      // Mouse move effect
      const targetX = state.mouse.x * 0.5;
      const targetY = state.mouse.y * 0.5;

      particlesRef.current.position.x = THREE.MathUtils.lerp(particlesRef.current.position.x, targetX, 0.01);
      particlesRef.current.position.y = THREE.MathUtils.lerp(particlesRef.current.position.y, targetY, 0.01);
    }
  });

  return (
    <Points ref={particlesRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#61dafb"
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const Scene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <Particles />
    </Canvas>
  );
};

export default Scene;
