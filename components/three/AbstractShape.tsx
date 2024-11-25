import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shader = {
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color("#4f46e5") }, // Indigo
      color2: { value: new THREE.Color("#22d3ee") }, // Cyan
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform float time;
      
      void main() {
        vUv = uv;
        vNormal = normal;
        
        vec3 pos = position;
        
        // Smooth morphing
        float theta = pos.y * 2.0 + time * 0.5;
        float c = cos(theta);
        float s = sin(theta);
        
        pos.xz *= mat2(c, -s, s, c);
        
        // Organic deformation
        pos += normal * (
          sin(pos.y * 4.0 + time) * 0.1 +
          cos(pos.x * 4.0 + time * 0.7) * 0.1 +
          sin(pos.z * 4.0 + time * 0.5) * 0.1
        );
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        // Dynamic color blend
        float t = sin(vUv.x * 3.0 + time) * 0.5 + 0.5;
        vec3 color = mix(color1, color2, t);
        
        // Fresnel effect
        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        color += fresnel * 0.2; // Reduced fresnel intensity
        
        // Pulse effect
        float pulse = sin(time * 0.5) * 0.5 + 0.5;
        color *= 0.6 + pulse * 0.1; // Reduced overall brightness
        
        // More transparency
        float alpha = 0.3 + fresnel * 0.1; // Reduced base opacity
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
  };

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
      <icosahedronGeometry args={[1, 4]} />
      <shaderMaterial
        ref={materialRef}
        args={[shader]}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </mesh>
  );
}

export default AbstractShape; 