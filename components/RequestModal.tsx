"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useModal } from '@/contexts/ModalContext';

export default function RequestModal() {
  const { isRequestModalOpen, closeRequestModal } = useModal();
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
      setTimeout(() => {
        closeRequestModal();
        setStatus('idle');
        setFormState({
          name: '',
          email: '',
          projectType: '',
          budget: '',
          description: ''
        });
      }, 2000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
    }
  };

  return (
    <AnimatePresence>
      {isRequestModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeRequestModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
          >
            <div className="relative mx-4">
              {/* Gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-2xl blur-2xl" />
              
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10">
                {/* Close button */}
                <button
                  onClick={closeRequestModal}
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="p-8">
                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-8"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-4">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                      <p className="text-white/60">
                        Мы свяжемся с вами в ближайшее время для обсуждения деталей.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-2">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-emerald-500">
                          Заявка на проект
                        </span>
                      </h2>
                      <p className="text-white/60 mb-6">
                        Расскажите о вашем проекте, и мы свяжемся с вами для обсуждения деталей
                      </p>

                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center space-x-2 p-4 mb-6 rounded-lg bg-red-500/10 border border-red-500/20"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <p className="text-sm text-red-500">{errorMessage}</p>
                        </motion.div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formState.name}
                              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formState.email}
                              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Email"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-1">
                              Project Type
                            </label>
                            <select
                              name="projectType"
                              value={formState.projectType}
                              onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value="">Select project type</option>
                              <option value="Web Development">Web Development</option>
                              <option value="Mobile Development">Mobile Development</option>
                              <option value="UI/UX Design">UI/UX Design</option>
                              <option value="SEO">SEO</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-1">
                              Budget
                            </label>
                            <input
                              type="number"
                              name="budget"
                              value={formState.budget}
                              onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Budget"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-white/80 mb-1">
                              Description
                            </label>
                            <textarea
                              name="description"
                              value={formState.description}
                              onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              placeholder="Description"
                            />
                          </div>
                          <div className="mt-4">
                            <button
                              type="submit"
                              disabled={status === 'submitting'}
                              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              {status === 'submitting' ? (
                                <Loader2 className="animate-spin h-5 w-5 text-white" />
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 