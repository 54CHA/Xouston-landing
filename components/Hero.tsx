"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Smartphone, Globe } from 'lucide-react';
import Scene from './three/Scene';
import { useModal } from '@/contexts/ModalContext';

export default function Hero() {
  const { openRequestModal } = useModal();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0" />
      
      <Scene />
  
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 mt-20 lg:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="sticky top-24">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">
                  Создаем цифровое
                </span>
                <br />
                <span className="text-white">превосходство</span>
              </h2>

              <p className="text-xl text-indigo-200 mb-8">
                Мы создаем уникальные мобильные и веб решения, которые способствуют росту прогрессивного бизнеса
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openRequestModal}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-medium">
                    <span>Оставить заявку</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>

                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  <div className="relative flex items-center justify-center px-6 py-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
                    <span>Изучить услуги</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative space-y-6">
              {[
                {
                  icon: Code2,
                  title: "Веб-разработка",
                  description: "Современные, адаптивные веб-сайты, созданные с использованием передовых технологий",
                  gradient: "from-indigo-500 to-blue-500"
                },
                {
                  icon: Smartphone,
                  title: "Мобильная разработка",
                  description: "Нативные и кроссплатформенные мобильные приложения",
                  gradient: "from-emerald-500 to-cyan-500"
                },
                {
                  icon: Globe,
                  title: "Кастомные решения",
                  description: "Разработка уникальных и инновационных продуктов для вашего бизнеса",
                  gradient: "from-blue-500 to-violet-500"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <a href="#services" className="block">
                    <div className="relative flex items-center space-x-6 p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>
                      
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 border border-white/10">
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-indigo-200">{item.description}</p>
                      </div>
                      <ArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-white" />
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}