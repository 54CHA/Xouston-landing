"use client";

import ModalBackground from './three/ModalBackground';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Loader2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useModal } from '@/contexts/ModalContext';

export default function RequestModal() {
  const { isRequestModalOpen, closeRequestModal } = useModal();
  
  const [formState, setFormState] = useState({
    name: '',
    contact: '',
    position: '',
    company: '',
    description: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!response.ok) throw new Error('Failed to submit form');

      setStatus('success');
      setTimeout(() => {
        closeRequestModal();
        setStatus('idle');
        setFormState({ name: '', contact: '', position: '', company: '', description: '' });
      }, 2000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    }
  };

  return (
    <AnimatePresence>
      {isRequestModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4 sm:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="border border-purple-500/10 rounded-2xl sm:rounded-3xl w-full max-w-2xl relative overflow-hidden"
          >
            <ModalBackground />
            
            <div className="absolute inset-0">
              <div 
                className="absolute inset-0 backdrop-blur-sm mix-blend-overlay opacity-70"
                style={{
                  background: 'linear-gradient(145deg, rgba(125,211,252,0.05) 0%, rgba(167,139,250,0) 100%)'
                }}
              />
              
              <div 
                className="absolute inset-0 backdrop-blur-3xl"
                style={{
                  background: 'linear-gradient(145deg, rgba(139,92,246,0.15) 0%, rgba(14,165,233,0.05) 50%, transparent 100%)',
                  maskImage: 'radial-gradient(circle at 50% 0%, black, transparent 70%)'
                }}
              />
              
              <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/60" />

            <div className="relative z-10 p-4 sm:p-8 md:p-12">
              <button
                onClick={closeRequestModal}
                className="absolute right-2 top-2 sm:right-4 sm:top-4 p-2 rounded-full hover:bg-white/10 duration-400 hover:scale-110 transition-all"
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </button>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6 sm:py-8"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/10 mb-4">
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                  <p className="text-sm sm:text-base text-white/60">Мы свяжемся с вами в ближайшее время для обсуждения деталей.</p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-500 font-bold">
                      Отправить заявку
                    </span>
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {[
                        { label: 'Имя', value: 'name', placeholder: 'Ваше имя' },
                        { label: 'Контакт', value: 'contact', placeholder: 'Telegram/Email/Phone' },
                        { label: 'Должность', value: 'position', placeholder: 'Ваша должность' },
                        { label: 'Компания', value: 'company', placeholder: 'Название компании' }
                      ].map((field) => (
                        <div key={field.value}>
                          <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            required
                            value={formState[field.value as keyof typeof formState]}
                            onChange={(e) => setFormState({ ...formState, [field.value]: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-md border border-white/20 
                              rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                              text-white placeholder-white/50 text-sm sm:text-base shadow-lg 
                              transition-all hover:bg-white/15"
                            placeholder={field.placeholder}
                          />
                        </div>
                      ))}

                      <div className="sm:col-span-2">
                        <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1">
                          Опишите вашу задачу
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formState.description}
                          onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/10 backdrop-blur-md border border-white/20 
                            rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
                            text-white placeholder-white/50 text-sm sm:text-base shadow-lg 
                            transition-all hover:bg-white/15"
                          placeholder="Расскажите подробнее о вашей задаче..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full group relative mt-6 sm:mt-8"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 
                        rounded-lg opacity-75 blur group-hover:opacity-100 transition" />
                      <div className="relative flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 
                        bg-black/80 backdrop-blur-sm rounded-lg">
                        {status === 'submitting' ? (
                          <Loader2 className="animate-spin h-5 w-5 text-white" />
                        ) : (
                          <div className="flex items-center text-white text-sm sm:text-base">
                            <span>Отправить заявку</span>
                            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </div>
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 