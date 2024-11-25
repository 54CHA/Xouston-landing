"use client";

import { motion } from 'framer-motion';
import { Code2, Smartphone, Palette, Database, LineChart, Layers } from 'lucide-react';
import { useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import dynamic from 'next/dynamic';
import { SiReact, SiTypescript, SiPython, SiSwift, SiDocker, SiGo, SiKotlin } from 'react-icons/si';

// Dynamically import the GlitchSphere to avoid SSR issues
const GlitchSphere = dynamic(() => import('./three/GlitchSphere').then(mod => mod.GlitchSphere), {
  ssr: false
});

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="sticky top-24">
              <motion.div className="mb-6">
                <span className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 blur-lg opacity-25" />
                  <span className="relative px-6 py-2 text-sm text-white/90 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                    Наша команда
                  </span>
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">
                  Профессионалы
                </span>
                <br />
                <span className="text-white">своего дела</span>
              </h2>

              <p className="text-xl text-indigo-200 mb-12">
                Наша команда состоит из опытных разработчиков, специализирующихся на создании современных веб-приложений. Мы используем передовые технологии и методологии разработки, чтобы создавать эффективные и масштабируемые решения для наших клиентов.
              </p>

              <div className="flex flex-wrap gap-8">
                {[
                  { icon: SiReact, color: "#61DAFB", label: "React" },
                  { icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
                  { icon: SiKotlin, color: "#7F52FF", label: "Kotlin" },
                  { icon: SiSwift, color: "#F05138", label: "Swift" },
                  { icon: SiGo, color: "#00ADD8", label: "Go" },
                  { icon: SiPython, color: "#3776AB", label: "Python" },
                  { icon: SiDocker, color: "#2496ED", label: "Docker" },
                ].map((Item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                    className="relative group cursor-pointer"
                  >
                    <Item.icon 
                      style={{ color: Item.color }}
                      className={`w-12 h-12 transition-all duration-300 
                        drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]
                        group-hover:drop-shadow-[0_0_16px_${Item.color}60]`}
                    />
                    <motion.span 
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 
                        text-sm text-white/70 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200 whitespace-nowrap"
                    >
                      {Item.label}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative lg:h-[800px] h-[400px]"
          >
            <div className="absolute inset-0">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
                <GlitchSphere />
                <Environment preset="warehouse" />
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 