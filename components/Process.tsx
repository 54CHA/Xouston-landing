"use client";

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FileSignature, Paintbrush, Code2, FileText, CheckCircle2, Settings, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';

const steps = [
  {
    icon: FileSignature,
    title: "Подпись договора",
    description: "Обсуждаем все детали проекта и заключаем договор с четкими условиями.",
    gradient: "from-violet-500 to-indigo-500",
    features: [
      "Согласование условий",
      "Определение сроков",
      "Фиксация стоимости",
      "Подписание документов"
    ]
  },
  {
    icon: Paintbrush,
    title: "Разработка и утверждение дизайна",
    description: "Создаем уникальный дизайн, учитывая ваши пожелания и современные тенденции.",
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Прототипирование",
      "UI/UX дизайн",
      "Адаптивная верстка",
      "Согласование макетов"
    ]
  },
  {
    icon: Code2,
    title: "Разработка продукта",
    description: "Воплощаем дизайн в полноценный рабочий продукт с использованием современных технологий.",
    gradient: "from-emerald-500 to-green-500",
    features: [
      "Frontend разработка",
      "Backend разработка",
      "Интеграция API",
      "Оптимизация кода"
    ]
  },
  {
    icon: FileText,
    title: "Заполнение контентом",
    description: "Наполняем сайт качественным контентом и необходимой информацией.",
    gradient: "from-amber-500 to-orange-500",
    features: [
      "Создание текстов",
      "Оптимизация изображений",
      "Структурирование данных",
      "Проверка контента"
    ]
  },
  {
    icon: CheckCircle2,
    title: "Сдача",
    description: "Проводим финальное тестирование и передаем готовый проект.",
    gradient: "from-rose-500 to-red-500",
    features: [
      "Тестирование",
      "Исправление багов",
      "Документация",
      "Передача проекта"
    ]
  },
  // {
  //   icon: Settings,
  //   title: "Доп услуги",
  //   description: "Предоставляем дополнительные услуги для развития вашего проекта.",
  //   gradient: "from-purple-500 to-pink-500",
  //   features: [
  //     "SEO оптимизация",
  //     "Техническая поддержка",
  //     "Аналитика",
  //     "Маркетинговое продвижение"
  //   ]
  // }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  return (
    <section ref={containerRef} className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <span className="text-sm text-white/80">Как мы работаем</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Наш процесс
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-emerald-400"> разработки</span>
          </motion.h2>
        </motion.div>

        <div className="relative h-[400vh]">
          {steps.map((step, index) => {
            const { scrollYProgress } = useScroll({
              target: containerRef,
              offset: [`${index * 0.15} start`, `${index * 0.15 + 0.1} start`]
            });

            const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
            const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

            // Track progress for next four cards
            const nextCardProgress = useScroll({
              target: containerRef,
              offset: [`${(index + 1) * 0.15} start`, `${(index + 1) * 0.15 + 0.1} start`]
            });

            const nextNextCardProgress = useScroll({
              target: containerRef,
              offset: [`${(index + 2) * 0.15} start`, `${(index + 2) * 0.15 + 0.1} start`]
            });

            const thirdNextCardProgress = useScroll({
              target: containerRef,
              offset: [`${(index + 3) * 0.15} start`, `${(index + 3) * 0.15 + 0.1} start`]
            });

            const fourthNextCardProgress = useScroll({
              target: containerRef,
              offset: [`${(index + 4) * 0.15} start`, `${(index + 4) * 0.15 + 0.1} start`]
            });

            // Four levels of scaling with more dramatic reductions
            const initialScale = useTransform(
              nextCardProgress.scrollYProgress,
              [0, 0.5, 1],
              [1, 1, 0.95]
            );

            const secondaryScale = useTransform(
              nextNextCardProgress.scrollYProgress,
              [0, 0.5, 1],
              [1, 1, 0.90]
            );

            const tertiaryScale = useTransform(
              thirdNextCardProgress.scrollYProgress,
              [0, 0.5, 1],
              [1, 1, 0.85]
            );

            const quaternaryScale = useTransform(
              fourthNextCardProgress.scrollYProgress,
              [0, 0.5, 1],
              [1, 1, 0.80]
            );

            // Combine all scales
            const scale = useTransform(
              [initialScale, secondaryScale, tertiaryScale, quaternaryScale] as const,
              ([scale1, scale2, scale3, scale4]: number[]) => Math.min(scale1, scale2, scale3, scale4)
            );

            return (
              <motion.div
                key={step.title}
                style={{
                  position: 'sticky',
                  top: `${24 + index * 6}vh`,
                  zIndex: index,
                  opacity,
                  y,
                  scale,
                  transformOrigin: "center top",
                }}
                className="group"
              >
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:bg-black/50 transition-all duration-300">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                  
                  {/* Icon and Number */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${step.gradient} bg-opacity-10`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white/60">Step {index + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-base">
                      {step.description}
                    </p>
                    
                    {/* Features */}
                    <motion.div 
                      className="grid grid-cols-2 gap-4 mt-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: activeStep === index ? 1 : 0,
                        height: activeStep === index ? 'auto' : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className="flex items-center gap-2 text-white/60"
                        >
                          <CheckCircle2 className="h-4 w-4 text-white/40" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </motion.div>

                    {/* Learn More Link */}
                    <div className="flex items-center mt-6 text-white/60 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Подробнее</span>
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
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