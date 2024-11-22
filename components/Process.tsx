"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Code, TestTube, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRef, useState } from 'react';

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "We analyze your needs and create a comprehensive project plan.",
    gradient: "from-violet-500 to-indigo-500",
    features: [
      "Requirements Analysis",
      "Market Research",
      "Project Scoping",
      "Timeline Planning"
    ]
  },
  {
    icon: Code,
    title: "Development",
    description: "Our team builds your solution using cutting-edge technologies.",
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Agile Development",
      "Clean Architecture",
      "Code Reviews",
      "Daily Updates"
    ]
  },
  {
    icon: TestTube,
    title: "Testing",
    description: "Rigorous testing ensures a flawless end product.",
    gradient: "from-emerald-500 to-green-500",
    features: [
      "Unit Testing",
      "Integration Testing",
      "Performance Testing",
      "User Acceptance"
    ]
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "We deploy your project and provide ongoing support.",
    gradient: "from-orange-500 to-red-500",
    features: [
      "Deployment Strategy",
      "Performance Monitoring",
      "24/7 Support",
      "Regular Updates"
    ]
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="process" className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/20 via-transparent to-blue-900/20" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="absolute h-[500px] w-[500px] -top-32 right-0 rounded-full bg-violet-500/20 blur-[100px] animate-blob" />
      <div className="absolute h-[500px] w-[500px] -bottom-32 -left-32 rounded-full bg-blue-500/20 blur-[100px] animate-blob animation-delay-2000" />
      <div className="absolute h-[500px] w-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[100px] animate-blob animation-delay-4000" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div style={{ y }} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
          >
            <span className="text-sm text-white/80">How We Work</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Our Development
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-emerald-400"> Process</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setActiveStep(index)}
              onHoverEnd={() => setActiveStep(null)}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl`} />
              <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${step.gradient} bg-opacity-10 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-400 mb-6">{step.description}</p>
                
                <div className={`space-y-3 transition-all duration-300 ${activeStep === index ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0'}`} 
                     style={{
                       position: 'relative',
                       top: 0,
                       overflow: 'hidden',
                     }}>
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-white/60" />
                      <span className="text-sm text-white/60">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center text-white/60 group-hover:text-white transition-colors">
                  <span className="text-sm">Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-[2px] bg-gradient-to-r from-white/20 to-transparent group-hover:from-white/30 transition-colors duration-300"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}