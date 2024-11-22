"use client";

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function SpinningCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.3;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#4f46e5"
        wireframe
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}