"use client";

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, Heart } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Process", href: "#process" },
      { name: "Contact", href: "#contact" }
    ]
  },
  {
    title: "Solutions",
    links: [
      { name: "Web Development", href: "#web-dev" },
      { name: "Mobile Apps", href: "#mobile" },
      { name: "Cloud Services", href: "#cloud" },
      { name: "API Integration", href: "#api" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#docs" },
      { name: "Blog", href: "#blog" },
      { name: "Case Studies", href: "#cases" },
      { name: "FAQ", href: "#faq" }
    ]
  }
];

const socialLinks = [
  { name: "Github", icon: Github, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Email", icon: Mail, href: "#" }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-emerald-900/20" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="absolute h-96 w-96 -bottom-48 -right-48 rounded-full bg-indigo-500/20 blur-3xl animate-blob" />
      <div className="absolute h-96 w-96 -bottom-48 -left-48 rounded-full bg-emerald-500/20 blur-3xl animate-blob animation-delay-2000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pt-20 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center space-x-2">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-emerald-500 opacity-10 rounded-xl" />
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">X</span>
                </div>
                <span className="text-xl font-bold text-white">Xouston</span>
              </div>
            </Link>
            <p className="text-gray-400 max-w-sm">
              Crafting exceptional digital experiences through innovative web and mobile solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
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

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Xouston. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="#privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
