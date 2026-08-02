'use client';
import React, { useState, useEffect } from 'react';
import { RefreshCw, Settings2, Code2 } from 'lucide-react';
import { SettingsModal } from '../ui/SettingsModal';
import { WelcomeModal } from '../ui/WelcomeModal';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Updated just now');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setLastUpdated('Updating...');
    // Mock refresh action
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('Updated just now');
    }, 2000);
  };

  const scrollToPanel = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.classList.add('ring-2', 'ring-dm-info', 'ring-offset-2', 'ring-offset-dm-canvas', 'transition-all');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-dm-info', 'ring-offset-2', 'ring-offset-dm-canvas');
      }, 1000);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled 
          ? 'bg-[rgba(255,255,255,0.035)] backdrop-blur-[18px] border-b border-[rgba(255,255,255,0.08)] py-2 md:py-3' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-[1680px] mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-dm-text-primary">
            <Code2 size={28} strokeWidth={1.5} />
          </div>
          <span className="font-sans font-semibold text-[15px] tracking-[-0.01em] text-dm-text-primary hidden sm:block">
            DevMirror
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          {[
            { id: 'leetcode', name: 'LeetCode', color: 'bg-dm-leetcode' },
            { id: 'github', name: 'GitHub', color: 'bg-dm-github' },
            { id: 'codeforces', name: 'Codeforces', color: 'bg-dm-info' },
            { id: 'codechef', name: 'CodeChef', color: 'bg-dm-codechef' },
          ].map((platform) => (
            <button
              key={platform.id}
              onClick={() => scrollToPanel(platform.id)}
              className="flex items-center gap-2 h-8 px-3 rounded-full bg-dm-surface-1 hover:bg-dm-surface-2 transition-colors cursor-pointer"
            >
              <div className={`w-2 h-2 rounded-full ${platform.color}`} />
              <span className="font-sans font-medium text-[13px] text-dm-text-primary">
                {platform.name}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="font-sans text-[12px] text-dm-text-muted hidden md:block">
            {lastUpdated}
          </span>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="w-9 h-9 rounded-sm flex items-center justify-center hover:bg-dm-surface-2 text-dm-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="w-9 h-9 rounded-sm flex items-center justify-center hover:bg-dm-surface-2 text-dm-text-primary transition-colors cursor-pointer"
          >
            <Settings2 size={18} />
          </button>
          <div className="w-8 h-8 rounded-full border-2 border-[rgba(255,255,255,0.08)] bg-dm-surface-2 overflow-hidden">
            <img src="https://github.com/github.png" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      
      <WelcomeModal onContinue={() => setIsSettingsOpen(true)} />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </nav>
  );
}
