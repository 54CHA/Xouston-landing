"use client";

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, ArrowRight, MapPin, Globe } from 'lucide-react';
import { useState } from 'react';

function ContactItem({ item }: { item: { icon: any, label: string, value: string, href: string | null } }) {
  return (
    <div className="relative flex items-center space-x-6 p-4 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-emerald-500/10 border border-white/10">
          <item.icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div>
        <p className="text-sm text-indigo-200">{item.label}</p>
        <p className="text-white font-medium">{item.value}</p>
      </div>
      {item.href && (
        <ArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-white" />
      )}
    </div>
  );
}

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    contact: '',
    company: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here - can use the same logic as RequestModal
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="lg:sticky lg:top-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">
                  Давайте создадим что-то
                </span>
                <br />
                <span className="text-white">Необычное</span>
              </h2>
              
              <div className="space-y-4">
                {[
                  { 
                    icon: Mail, 
                    label: "Электронная почта", 
                    value: "contact@xouston.com",
                    href: "mailto:contact@xouston.com"
                  },
                  { 
                    icon: MessageSquare, 
                    label: "Telegram", 
                    value: "@XoustonLab",
                    href: "https://t.me/XoustonLab"
                  },
                  { 
                    icon: Globe, 
                    label: "Режим работы", 
                    value: "Поддержка 24/7",
                    href: null
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    {item.href ? (
                      <a 
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <ContactItem item={item} />
                      </a>
                    ) : (
                      <ContactItem item={item} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-xl blur-2xl" />
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    { label: 'Имя', value: 'name', placeholder: 'Как к вам обращаться?' },
                    { label: 'Контакт', value: 'contact', placeholder: 'Telegram/Email/Phone' },
                    { label: 'Компания', value: 'company', placeholder: 'Если названия еще нет, не проблема', className: "col-span-2" }
                  ].map((field) => (
                    <div key={field.value} className={field.className}>
                      <label className="block text-xs sm:text-sm font-medium text-indigo-200 mb-1 sm:mb-2">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        required
                        value={formState[field.value as keyof typeof formState]}
                        onChange={(e) => setFormState({ ...formState, [field.value]: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/5 border border-white/10 
                          text-white placeholder-white/50 text-sm sm:text-base
                          focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                          transition-all duration-200"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-indigo-200 mb-1 sm:mb-2">
                      Опишите вашу идею
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.description}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/5 border border-white/10 
                        text-white placeholder-white/50 text-sm sm:text-base
                        focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                        transition-all duration-200"
                      placeholder="Расскажите в общих чертах, детали обсудим лично..."
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full group relative mt-4 sm:mt-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-lg blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-medium text-sm sm:text-base">
                    <span>Отправить сообщение</span>
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}