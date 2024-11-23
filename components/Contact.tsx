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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

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
                  { 
                    icon: Mail, 
                    label: "Электронная почта", 
                    value: "contact@xouston.com",
                    href: "mailto:contact@xouston.com"
                  },
                  { 
                    icon: MessageSquare, 
                    label: "Telegram", 
                    value: "@xouston",
                    href: "https://t.me/xouston"
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
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-xl blur-2xl" />
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
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
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