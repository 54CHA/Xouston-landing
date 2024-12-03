"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileSignature,
  Paintbrush,
  Code2,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: FileSignature,
    title: "Подписание договора",
    description:
      "Обсуждаем все детали проекта, составляем и подписываем договор с четкими условиями",
    gradient: "from-violet-500 to-indigo-500",
    features: [
      "Согласование условий",
      "Определение сроков",
      "Фиксация стоимости",
      "Подписание документов",
    ],
  },
  {
    icon: Paintbrush,
    title: "Разработка и утверждение дизайна",
    description:
      "Создаем уникальный дизайн, учитывая ваши пожелания и современные тенденции",
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Прототирование",
      "UI/UX дизайн",
      "Адаптивная верстка",
      "Согласование макетов",
    ],
  },
  {
    icon: Code2,
    title: "Разработка продукта",
    description:
      "Превращаем дизайн в полноценный рабочий продукт и проводим тестирование",
    gradient: "from-emerald-500 to-green-500",
    features: [
      "Frontend разработка",
      "Backend разработка",
      "Интеграция API",
      "Оптимизация кода",
    ],
  },
  {
    icon: FileText,
    title: "Заполнение контентом",
    description:
      "Наполняем сайт контентом, загружаем фотографии и текстовые материалы",
    gradient: "from-amber-500 to-orange-500",
    features: [
      "Создание текстов",
      "Оптимизация изображений",
      "Структурирование данных",
      "Проверка контента",
    ],
  },
  {
    icon: CheckCircle2,
    title: "Сдача",
    description:
      "Проводим финальное тестирование, помогаем развернуть проект и передаем все необходимые данные",
    gradient: "from-rose-500 to-red-500",
    features: [
      "Тестирование",
      "Исправление багов",
      "Документация",
      "Передача проекта",
    ],
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

// Create a separate component for each card to properly use hooks
function ProcessCard({
  step,
  index,
  containerRef,
}: {
  step: (typeof steps)[0];
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`${index * 0.15} start`, `${(index + 1) * 0.15} start`],
  });

  // Smoother opacity transition
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 1],
    [0, 0, 0.5, 1, 1]
  );

  // More natural easing for the y movement
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [300, 300, 0, 0]);

  const nextCardProgress = useScroll({
    target: containerRef,
    offset: [`${(index + 1) * 0.15} start`, `${(index + 2) * 0.15} start`],
  });

  // Smoother scale reduction with easeInOut
  const scale = useTransform(
    nextCardProgress.scrollYProgress,
    [0, 0.4, 0.8, 1],
    [1, 1, 0.97, 0.95]
  );

  // Add subtle rotation for more depth
  const rotate = useTransform(
    nextCardProgress.scrollYProgress,
    [0, 1],
    [0, -0.5]
  );

  return (
    <motion.div
      style={{
        position: "sticky",
        top: `calc(20vh + ${index * 30}px)`,
        opacity,
        y,
        scale,
        rotateX: rotate,
        transformPerspective: 1000,
        width: "100%",
        maxWidth: "900px",
      }}
      className="group mx-auto"
      transition={{ ease: "easeInOut" }}
    >
      <div className="relative overflow-hidden bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all duration-300">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${step.gradient} blur-2xl`}
        />

        <div className="relative p-8">
          {/* Header Section with improved layout */}
          <div className="flex items-start gap-6 mb-8">
            <div
              className={`shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r ${step.gradient} p-[1px] shadow-lg`}
            >
              <div className="w-full h-full bg-black/80 rounded-xl flex items-center justify-center backdrop-blur-xl">
                <step.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <span className="inline-block px-3 py-1 rounded-full bg-white/5 text-sm font-medium text-white/60 mb-3">
                Этап {index + 1}
              </span>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {step.title}
              </h3>
            </div>
          </div>

          {/* Description with improved typography */}
          <p className="text-white/70 text-base leading-relaxed mb-8">
            {step.description}
          </p>

          {/* Features with enhanced styling */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {step.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="flex items-center gap-3 group/feature"
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient} group-hover/feature:scale-125 transition-transform duration-300`}
                />
                <span className="text-sm text-white/70 group-hover/feature:text-white/90 transition-colors duration-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-white/5 to-transparent opacity-25 blur-2xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-t from-white/5 to-transparent opacity-25 blur-2xl rounded-full transform -translate-x-1/2 translate-y-1/2" />
      </div>
    </motion.div>
  );
}

// Add this to your global CSS or as a style tag
const styles = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-shimmer {
    animation: shimmer 8s infinite;
  }
`;

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

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
                Как мы раотаем
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
            <span className="text-white">Процесс</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              разработки
            </span>
          </motion.h2>
        </motion.div>

        <div className="relative h-[300vh]">
          {steps.map((step, index) => (
            <ProcessCard
              key={step.title}
              step={step}
              index={index}
              containerRef={containerRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
