"use client";

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { FileSignature, Paintbrush, Code2, FileText, CheckCircle2, Settings, ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';

const steps = [
  {
    icon: FileSignature,
    title: "Подпись договора",
    description: "Обсуждаем все детали проекта, создаем и заключаем договор с четкими условиями.",
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
    <section id="process" ref={containerRef} className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-20">
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
                Как мы работаем
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
            <span className="text-white">Наш процесс</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              разработки
            </span>
          </motion.h2>
        </motion.div>

        <div className="relative h-[400vh] flex flex-col items-center">
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
                  maxWidth: "900px",
                  width: "100%"
                }}
                className="group"
              >
                <div 
                  className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hover:bg-black/50 transition-all duration-300 group/card"
                  style={{ transition: 'transform 0.1s ease-out' }}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                  
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white/60 mb-2 block">Этап {index + 1}</span>
                      <h3 className="text-2xl font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <div className={`flex-shrink-0 ml-4 w-12 h-12 rounded-xl bg-gradient-to-r ${step.gradient} p-[1px]`}>
                      <div className="w-full h-full bg-black/80 rounded-xl flex items-center justify-center">
                        <step.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-base mb-6">
                    {step.description}
                  </p>
                  
                  {/* Features */}
                  <motion.div 
                    className="grid grid-cols-2 gap-x-6 gap-y-4"
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
                        className="flex items-center gap-2"
                      >
                        <div className="w-1 h-1 rounded-full bg-white/40" />
                        <span className="text-sm text-white/60">{feature}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Learn More Link */}
                  
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>  
    </section>
  );
}