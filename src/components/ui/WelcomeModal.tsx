/* eslint-disable */
'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Settings2, X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WelcomeModal({ onContinue }: { onContinue?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasVisited = localStorage.getItem('devmirror-visited');
      if (!hasVisited) {
        setIsOpen(true);
      }
    }, 1000); // Small delay to let the beautiful UI load first

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('devmirror-visited', 'true');
    if (onContinue) onContinue();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md z-10"
          >
            <GlassCard className="p-0 overflow-hidden border border-white/10 shadow-2xl">
              {/* Header */}
              <div className="relative h-32 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-6 flex items-center justify-center border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-400/20 via-transparent to-transparent opacity-60"></div>
                
                <motion.div
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="relative z-10 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl"
                >
                  <Sparkles className="w-10 h-10 text-indigo-400" />
                </motion.div>

                <button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6 bg-black/40">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                    Welcome to DevMirror!
                  </h2>
                  <p className="text-white/60 leading-relaxed text-sm">
                    Right now, you are looking at my personal developer stats. But this dashboard is completely dynamic!
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4">
                  <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg shrink-0 mt-0.5">
                    <Settings2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-medium text-sm mb-1">Customize Your Handles</h3>
                    <p className="text-white/50 text-xs leading-relaxed">
                      Click the settings gear icon in the top right of the navigation bar to enter your own GitHub, LeetCode, Codeforces, and CodeChef handles.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3 px-4 bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all font-medium rounded-xl flex items-center justify-center gap-2 group"
                >
                  Got it, let's explore!
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
