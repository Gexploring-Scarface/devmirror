/* eslint-disable */
'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { useHandles, PlatformHandles } from '@/hooks/useHandles';
import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { handles, saveHandles, isLoaded } = useHandles();
  const [localHandles, setLocalHandles] = useState<PlatformHandles>(handles);

  useEffect(() => {
    if (isLoaded) {
      const stored = localStorage.getItem('devmirror-handles');
      if (stored) {
        setLocalHandles(JSON.parse(stored));
      } else {
        setLocalHandles({ github: '', leetcode: '', codeforces: '', codechef: '' });
      }
    }
  }, [isLoaded]);

  if (!isOpen) return null;

  const handleSave = () => {
    saveHandles(localHandles);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <GlassCard className="w-full max-w-md relative p-6">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-dm-text-muted hover:text-dm-text-primary transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-sans font-semibold text-dm-text-primary mb-6">Configure Handles</h2>
        
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dm-text-secondary">GitHub Username</label>
            <input 
              type="text" 
              value={localHandles.github}
              onChange={(e) => setLocalHandles({...localHandles, github: e.target.value})}
              className="bg-dm-surface-2 border border-[rgba(255,255,255,0.1)] rounded-md px-3 py-2 text-dm-text-primary focus:outline-none focus:border-dm-text-muted transition-colors"
              placeholder="e.g. torvalds"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dm-text-secondary">LeetCode Username</label>
            <input 
              type="text" 
              value={localHandles.leetcode}
              onChange={(e) => setLocalHandles({...localHandles, leetcode: e.target.value})}
              className="bg-dm-surface-2 border border-[rgba(255,255,255,0.1)] rounded-md px-3 py-2 text-dm-text-primary focus:outline-none focus:border-dm-text-muted transition-colors"
              placeholder="e.g. neetcode"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dm-text-secondary">Codeforces Handle</label>
            <input 
              type="text" 
              value={localHandles.codeforces}
              onChange={(e) => setLocalHandles({...localHandles, codeforces: e.target.value})}
              className="bg-dm-surface-2 border border-[rgba(255,255,255,0.1)] rounded-md px-3 py-2 text-dm-text-primary focus:outline-none focus:border-dm-text-muted transition-colors"
              placeholder="e.g. tourist"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-dm-text-secondary">CodeChef Handle</label>
            <input 
              type="text" 
              value={localHandles.codechef}
              onChange={(e) => setLocalHandles({...localHandles, codechef: e.target.value})}
              className="bg-dm-surface-2 border border-[rgba(255,255,255,0.1)] rounded-md px-3 py-2 text-dm-text-primary focus:outline-none focus:border-dm-text-muted transition-colors"
              placeholder="e.g. genie"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-md font-medium text-dm-text-secondary hover:bg-dm-surface-2 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 rounded-md font-medium bg-dm-text-primary text-dm-canvas hover:bg-white transition-colors"
          >
            Save Changes
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

