"use client";

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Grid, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingGrid() {
  const primaryGridRef = useRef<any>();
  const secondaryGridRef = useRef<any>();
  const mouse = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Primary grid animation
    if (primaryGridRef.current) {
      primaryGridRef.current.position.z = (time * 0.15) % 1;
      primaryGridRef.current.material.opacity = 0.15 + Math.sin(time * 0.5) * 0.05;
      primaryGridRef.current.rotation.x = -Math.PI / 2.5 + Math.sin(time * 0.2) * 0.05;
      
      // Mouse influence on primary grid
      primaryGridRef.current.position.y = -2 + mouse.current.y * 0.2;
      primaryGridRef.current.rotation.z = mouse.current.x * 0.05;
    }

    // Secondary grid animation (opposite direction)
    if (secondaryGridRef.current) {
      secondaryGridRef.current.position.z = (-time * 0.1) % 1;
      secondaryGridRef.current.material.opacity = 0.1 + Math.cos(time * 0.5) * 0.05;
      secondaryGridRef.current.rotation.x = -Math.PI / 2.5 - Math.sin(time * 0.2) * 0.05;
      
      // Inverse mouse influence on secondary grid
      secondaryGridRef.current.position.y = -2.1 - mouse.current.y * 0.1;
      secondaryGridRef.current.rotation.z = -mouse.current.x * 0.03;
    }
  });

  return (
    <group>
      {/* Primary Grid (faster, more prominent) */}
      <Grid
        ref={primaryGridRef}
        position={[0, -2, 0]}
        args={[30, 30]}
        cellSize={0.6}
        cellThickness={0.6}
        cellColor="#1e40af"
        sectionSize={2}
        fadeStrength={5}
        fadeDistance={25}
        infiniteGrid
        sectionColor="#0f1f5c"
        sectionThickness={1}
      />

      {/* Secondary Grid (slower, more subtle) */}
      <Grid
        ref={secondaryGridRef}
        position={[0, -2.1, 0]}
        args={[40, 40]}
        cellSize={1.2}
        cellThickness={0.4}
        cellColor="#0f1f5c"
        sectionSize={4}
        fadeStrength={3}
        fadeDistance={35}
        infiniteGrid
        sectionColor="#1e40af"
        sectionThickness={0.8}
      />

      {/* Additional decorative elements */}
      <group position={[0, -1.9, 0]} rotation={[-Math.PI / 2.5, 0, 0]}>
        {[-15, -10, -5, 0, 5, 10, 15].map((x, i) => (
          <Line
            key={i}
            points={[[x, -15, 0], [x, 15, 0]]}
            color="#3b82f6"
            lineWidth={0.3}
            transparent
            opacity={0.2}
          />
        ))}
      </group>
    </group>
  );
}