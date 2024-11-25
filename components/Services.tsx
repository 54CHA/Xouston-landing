"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Smartphone, Globe, Rocket, Database, Lock, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { IconBrandTelegram } from '@tabler/icons-react';

const services = [
  {
    title: "Сайты",
    description: "Современные, быстрые и адаптивные сайты для вашего бизнеса.",
    delay: 0.2,
    icon: Globe
  },
  {
    title: "Веб-приложения",
    description: "Сложные веб-приложения с богатым функционалом и интерактивностью.",
    delay: 0.3,
    icon: Code2
  },
  {
    title: "Telegram/ВК сервисы",
    description: "Боты, мини-приложения и другие интеграции.",
    delay: 0.4,
    icon: IconBrandTelegram
  },
  {
    title: "Мобильные приложения",
    description: "Нативные приложения для iOS и Android с современным дизайном.",
    delay: 0.5,
    icon: Smartphone
  },
  {
    title: "Особые проекты",
    description: "Нестандартные решения и индивидуальные разработки под ваши уникальные задачи.",
    delay: 0.6,
    icon: Rocket
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    cardRef: React.RefObject<HTMLDivElement>
  ) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = -(x - centerX) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (cardRef: React.RefObject<HTMLDivElement>) => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="" />
      
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <motion.div style={{ y }} className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 blur-lg opacity-25" />
              <span className="relative px-6 py-2 text-sm text-white/90 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                Наши услуги
              </span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-white">Преобразуем ваши идеи в</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              Цифровой реальность
            </span>
          </motion.h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const cardRef = useRef<HTMLDivElement>(null);
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: service.delay }}
                className={`group relative ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''
                }`}
              >
                <div
                  ref={cardRef}
                  onMouseMove={(e) => handleMouseMove(e, cardRef)}
                  onMouseLeave={() => handleMouseLeave(cardRef)}
                  className="relative h-full bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 p-8 rounded-2xl overflow-hidden"
                  style={{ transition: 'transform 0.1s ease-out' }}
                >
                  {/* Icon - Updated styles */}
                  <div className="absolute -top-4 -right-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <service.icon className="w-24 h-24 text-white/[0.03] group-hover:text-indigo-300/[0.3] transition-colors duration-300" />
                  </div>

                  {/* Number indicator */}
                  <div className="relative z-10">
                    <div className="relative inline-flex mb-6">
                      <span className="px-3 py-1 text-sm text-white/90 bg-white/5 rounded-full border border-white/10">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium mb-3 text-white group-hover:text-indigo-300 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors pb-8">
                      {service.description}
                    </p>

                    {/* Arrow indicator */}
                    {/* <div className="mt-6 flex items-center text-white/60 group-hover:text-white transition-colors">
                      <span className="text-sm">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div> */}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}