"use client";

import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, MessageSquare, Globe } from 'lucide-react';
import Link from 'next/link';
import { SiReact, SiTypescript, SiPython, SiSwift, SiDocker, SiGo, SiKotlin } from 'react-icons/si';

const footerLinks = [
  {
    title: "Навигация",
    links: [
      { name: "Главная", href: "#" },
      { name: "Услуги", href: "#services" },
      { name: "Процесс", href: "#process" },
      { name: "Команда", href: "#team" },
      { name: "Контакты", href: "#contact" }
    ]
  },
  {
    title: "Связаться",
    links: [
      { name: "Telegram", href: "https://t.me/sachakhv", icon: MessageSquare },
      { name: "Email", href: "mailto:shsha.khv@gmail.com", icon: Mail },
      { name: "24/7 Поддержка", href: "#", icon: Globe }
    ]
  }
];

const technologies = [
  { icon: SiReact, name: "React" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiKotlin, name: "Kotlin" },
  { icon: SiSwift, name: "Swift" },
  { icon: SiGo, name: "Go" },
  { icon: SiPython, name: "Python" },
  { icon: SiDocker, name: "Docker" }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black/60 backdrop-blur-sm">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-emerald-900/20" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="absolute h-96 w-96 -bottom-48 -right-48 rounded-full bg-indigo-500/20 blur-3xl animate-blob" />
      <div className="absolute h-96 w-96 -bottom-48 -left-48 rounded-full bg-emerald-500/20 blur-3xl animate-blob animation-delay-2000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pt-16 sm:pt-20 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-block group">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {/* Animated glow effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full blur-xl opacity-20 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-tilt" />
                  
                  {/* Logo symbol */}
                  <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-black border border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-emerald-500/20" />
                    <div className="relative flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm">
                      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
                        X
                      </span>
                    </div>
                  </div>
                </div>
                {/* 800835 */}
                {/* Logo text */}
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
                    Xouston
                  </span>
                  <span className="text-xs text-white/50 tracking-widest uppercase">
                    Digital Lab
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-gray-400 max-w-sm">
              Создаем исключительный цифровой опыт через инновационные веб и мобильные решения.
            </p>
            
            {/* Technologies */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-white mb-4">Технологии</h4>
              <div className="flex flex-wrap gap-4">
                {technologies.map((tech, index) => (
                  <div key={tech.name} className="group cursor-pointer relative">
                    <tech.icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 sm:gap-12">
              {footerLinks.map((column) => (
                <div key={column.title}>
                  <h3 className="text-white font-semibold mb-4">{column.title}</h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.name}>
                        <motion.a
                          href={link.href}
                          className="group flex items-center text-gray-400 hover:text-white transition-colors"
                          whileHover={{ x: 2 }}
                        >
                          {link.name}
                          <ArrowUpRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © {currentYear} Xouston. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
