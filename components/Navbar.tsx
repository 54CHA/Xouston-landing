"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { 
    name: 'Solutions', 
    children: [
      { name: 'Web Development', href: '#web-dev', description: 'Modern web applications built with Next.js' },
      { name: 'Mobile Apps', href: '#mobile', description: 'Native iOS and Android development' },
      { name: 'Cloud Services', href: '#cloud', description: 'Scalable cloud infrastructure' },
    ]
  },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

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
      className="fixed top-0 left-0 right-0 z-50"
    >
      <nav className={`relative transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        {/* Enhanced Glassmorphic Background with Gradient Border */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />
        <div className={`absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <motion.a
              href="#"
              className="flex items-center space-x-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-black">
                  <span className="text-xl font-bold text-white">X</span>
                </div>
              </div>
              <span className="text-xl font-bold text-white">ouston</span>
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
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
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
                      className="flex items-center px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all outline-none"
                      whileHover={{ x: 2 }}
                    >
                      {item.name}
                    </motion.a>
                  )}
                </div>
              ))}
              
              {/* Modern Glowing CTA Button */}
              <motion.a
                href="#contact"
                className="group relative ml-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Subtle glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500" />

                {/* Button container */}
                <div className="relative flex items-center px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Button content */}
                  <div className="relative flex items-center space-x-2">
                    <span className="text-sm font-medium text-white">Get Started</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-500" />
                  </div>
                </div>
              </motion.a>
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
            className="absolute inset-x-0 top-full bg-black/50 backdrop-blur-xl md:hidden"
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