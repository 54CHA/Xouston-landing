"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from '@/contexts/ModalContext';

type NavItem = {
  name: string;
  href: string;
  children?: { name: string; href: string; description: string; }[];
};

const navigation: NavItem[] = [
  { name: 'Услуги', href: '#services' },
  { name: 'Процесс', href: '#process' },
  { name: 'Команда', href: '#team' },
  { name: 'Контакты', href: '#contact' },
];

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  
  // Try multiple times with increasing delays
  const tryScroll = (attempts = 0) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else if (attempts < 3) {
      // Try again after a delay, with increasing timeouts
      setTimeout(() => tryScroll(attempts + 1), 100 * (attempts + 1));
    }
  };
  
  tryScroll();
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { openRequestModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-10 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
    >
      <nav className={`mx-auto transition-all duration-300 relative
        ${scrolled ? 'max-w-5xl py-2' : 'max-w-7xl py-4'}`}
      >
        {/* Enhanced Glassmorphic Background with Gradient Border */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-lg rounded-full" />
        <div className={`absolute inset-x-0 -bottom-px h-[1px] bg-gradient-to-r 
          from-transparent via-white/20 to-transparent transition-opacity duration-300 
          ${scrolled ? 'opacity-100' : 'opacity-0'}`} 
        />
        
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Modern Logo */}
            <motion.a
              href="#"
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
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
              
              {/* Logo text */}
              <div className="flex flex-col">
                <span className="text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400">
                  Xouston
                </span>
                <span className="text-xs text-white/50 tracking-widest uppercase">
                  Design Lab
                </span>
              </div>
            </motion.a>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.children ? (
                    <div
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="group flex items-center space-x-1 px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all outline-none">
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 p-2 shadow-2xl shadow-black/40"
                          >
                            {item.children.map((child) => (
                              <motion.a
                                key={child.name}
                                href={child.href}
                                className="group flex flex-col rounded-xl px-4 py-3 hover:bg-white/10 transition-colors"
                                whileHover={{ x: 4 }}
                              >
                                <span className="text-sm font-medium text-white">{child.name}</span>
                                <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">{child.description}</span>
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="relative flex items-center px-4 py-2 text-sm text-white/70 transition-all duration-300 outline-none group"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="relative z-10">
                        {item.name}
                        <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-indigo-500 to-emerald-500 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                      </span>
                    </motion.a>
                  )}
                </div>
              ))}
              
              {/* Modern Glowing CTA Button */}
              <motion.button
                onClick={openRequestModal}
                className="group relative ml-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Subtle glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500" />

                {/* Button container */}
                <div className="relative flex items-center px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/80 to-emerald-500/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Button content */}
                  <div className="relative flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">Связаться</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-500" />
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden rounded-lg bg-white/5 p-2 text-white hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>  
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 top-full mt-2 bg-black/50 backdrop-blur-xl md:hidden rounded-xl"
          >
            <div className="space-y-1 px-4 py-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-white/70 px-3 py-2">
                        {item.name}
                      </div>
                      <div className="pl-4 space-y-1">
                        {item.children.map((child) => (
                          <motion.a
                            key={child.name}
                            href={child.href}
                            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            whileTap={{ scale: 0.95 }}
                          >
                            {child.name}
                            <ExternalLink className="h-3 w-3" />
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.a
                      href={item.href}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}

{/* Add this to your CSS */}
<style jsx global>{`
  @keyframes tilt {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(1deg); }
    75% { transform: rotate(-1deg); }
  }
  .animate-tilt {
    animation: tilt 10s infinite linear;
  }
`}</style>