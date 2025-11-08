// src/components/ProjectImage.tsx
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float ripple = sin(uv.x * 10.0 + uTime * 2.0) * 0.05;
    uv.y += ripple;
    gl_FragColor = texture2D(uTexture, uv);
  }
`;

const ProjectImage: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, imageUrl);

  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: texture },
    },
    vertexShader,
    fragmentShader,
  });

  useFrame((state) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} material={shaderMaterial}>
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  );
};

export default ProjectImage;
