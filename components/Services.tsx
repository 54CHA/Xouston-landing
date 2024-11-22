"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Smartphone, Globe, Rocket, Database, Lock, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const services = [
  {
    icon: Code2,
    title: "Веб-разработка",
    description: "Современные веб-приложения, созданные с использованием передовых технологий.",
    gradient: "from-indigo-500 to-violet-500",
    delay: 0.2
  },
  {
    icon: Smartphone,
    title: "Мобильная разработка",
    description: "Нативные iOS и Android приложения с исключительным пользовательским опытом.",
    gradient: "from-cyan-500 to-blue-500",
    delay: 0.3
  },
  {
    icon: Globe,
    title: "Прогрессивные веб-приложения",
    description: "Быстрые и надежные веб-приложения с поддержкой офлайн режима.",
    gradient: "from-emerald-500 to-green-500",
    delay: 0.4
  },
  {
    icon: Database,
    title: "Серверная разработка",
    description: "Масштабируемые серверные решения и надежные API архитектуры.",
    gradient: "from-orange-500 to-red-500",
    delay: 0.5
  },
  {
    icon: Lock,
    title: "Решения безопасности",
    description: "Внедрение лучших практик безопасности и защиты данных.",
    gradient: "from-pink-500 to-rose-500",
    delay: 0.6
  },
  {
    icon: Rocket,
    title: "Оптимизация производительности",
    description: "Услуги по оптимизации скорости и повышению производительности.",
    gradient: "from-amber-500 to-yellow-500",
    delay: 0.7
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="services" className="relative py-32 overflow-hidden bg-black -mt-10">
      {/* Unique Services Background */}
      <div className="absolute inset-0 bg-gradient-to-bl from-emerald-900/20 via-transparent to-cyan-900/20" />
      <div className="absolute inset-0 bg-grid-white/[0.02] rotate-3 scale-110" />
      <div className="absolute h-[500px] w-[500px] -top-32 -right-32 rounded-full bg-emerald-500/20 blur-[100px] animate-blob" />
      <div className="absolute h-[500px] w-[500px] -bottom-32 left-0 rounded-full bg-cyan-500/20 blur-[100px] animate-blob animation-delay-2000" />
      <div className="absolute h-[500px] w-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/20 blur-[100px] animate-blob animation-delay-4000" />
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: service.delay }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full rounded-2xl bg-white/[0.03] backdrop-blur-3xl border border-white/[0.05] transition-all duration-700">
                {/* Gradient Glow on Hover */}
                <div className="absolute -z-10 -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700" />
                
                {/* Card Content */}
                <div className="p-8">
                  {/* Icon with Gradient Background */}
                  <div className="relative inline-flex mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-xl hover-fade`} />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className={`relative p-4 rounded-xl bg-gradient-to-r ${service.gradient} bg-opacity-10`}
                    >
                      <service.icon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>

                  {/* Title with Gradient Hover Effect */}
                  <h3 className="text-xl font-semibold mb-3">
                    <span className="inline-block bg-clip-text transition-all duration-700 ease-in-out group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-emerald-400">
                      {service.title}
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-indigo-200/80 text-sm leading-relaxed transition-colors duration-700">
                    {service.description}
                  </p>

                  {/* Learn More Link with Enhanced Hover Effect */}
                  <div className="relative inline-flex items-center">
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-center text-white/60 hover:text-white transition-colors duration-300"
                    >
                      <span className="text-sm font-medium">Узнать больше</span>
                 
                    </motion.div>
                    {/* Animated Underline */}
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-indigo-500 to-emerald-500 group-hover:w-full transition-all duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}