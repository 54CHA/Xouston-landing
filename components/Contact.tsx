"use client";

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, ArrowRight, MapPin, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-emerald-900/20" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      <div className="absolute h-96 w-96 -top-48 -right-48 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="absolute h-96 w-96 -bottom-48 -left-48 rounded-full bg-emerald-500/30 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="sticky top-24">
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">
                  Давайте создадим что-то
                </span>
                <br />
                <span className="text-white">Необычное</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  { icon: Phone, label: "Позвоните нам", value: "+7 (555) 123-4567" },
                  { icon: Mail, label: "Напишите нам", value: "contact@xouston.com" },
                  { icon: MapPin, label: "Посетите нас", value: "ул. Инновационная, 123" },
                  { icon: Globe, label: "Режим работы", value: "Поддержка 24/7" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
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
                      <ArrowRight className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-white" />
                    </div>
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
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-3xl blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { label: "Ваше имя", type: "text", key: "name" },
                    { label: "Электронная почта", type: "email", key: "email" }
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-indigo-200 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={formState[field.key as keyof typeof formState]}
                        onChange={(e) => setFormState(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        placeholder={field.label}
                      />
                    </div>
                  ))}
                  
                  <div>
                    <label className="block text-sm font-medium text-indigo-200 mb-2">
                      Ваше сообщение
                    </label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Расскажите о вашем проекте..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-medium">
                      <span>Отправить сообщение</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}