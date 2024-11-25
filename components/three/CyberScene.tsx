"use client";

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

function GlitchSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Custom shader for glitch effect
  const shader = {
    uniforms: {
      time: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform float time;
      
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.x += sin(pos.y * 10.0 + time) * 0.1;
        pos.y += cos(pos.x * 10.0 + time) * 0.1;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform float time;
      
      void main() {
        vec3 color1 = vec3(0.3, 0.0, 0.5);
        vec3 color2 = vec3(0.0, 0.8, 0.8);
        
        float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453123);
        float glitch = step(0.98, noise + sin(time * 2.0) * 0.02);
        
        vec3 color = mix(color1, color2, vUv.y + sin(time) * 0.2);
        color = mix(color, vec3(1.0), glitch);
        
        gl_FragColor = vec4(color, 0.9);
      }
    `,
  };

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={3}>
      <icosahedronGeometry args={[1, 4]} />
      <shaderMaterial
        ref={materialRef}
        args={[shader]}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function CyberScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-black" />
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <GlitchSphere />
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  );
} 