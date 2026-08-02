'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { platformsConfig } from '@/lib/config/platforms.config';

export interface PlatformHandles {
  github: string;
  leetcode: string;
  codeforces: string;
  codechef: string;
}

const defaultHandles: PlatformHandles = {
  github: platformsConfig.github.handle,
  leetcode: platformsConfig.leetcode.handle,
  codeforces: platformsConfig.codeforces.handle,
  codechef: platformsConfig.codechef.handle,
};

interface HandlesContextType {
  handles: PlatformHandles;
  saveHandles: (newHandles: PlatformHandles) => void;
  isLoaded: boolean;
}

const HandlesContext = createContext<HandlesContextType | undefined>(undefined);

export function HandlesProvider({ children }: { children: React.ReactNode }) {
  const [handles, setHandles] = useState<PlatformHandles>(defaultHandles);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('devmirror-handles');
      if (stored) {
        setHandles(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load handles from local storage', err);
    }
    setIsLoaded(true);
  }, []);

  const saveHandles = (newHandles: PlatformHandles) => {
    setHandles(newHandles);
    try {
      localStorage.setItem('devmirror-handles', JSON.stringify(newHandles));
    } catch (err) {
      console.error('Failed to save handles to local storage', err);
    }
  };

  return (
    <HandlesContext.Provider value={{ handles, saveHandles, isLoaded }}>
      {children}
    </HandlesContext.Provider>
  );
}

export function useHandles() {
  const context = useContext(HandlesContext);
  if (context === undefined) {
    throw new Error('useHandles must be used within a HandlesProvider');
  }
  return context;
}
