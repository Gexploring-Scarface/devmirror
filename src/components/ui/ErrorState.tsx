import React from 'react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ message = 'Failed to load data', onRetry, className = '' }: ErrorStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center h-full w-full p-6 text-center ${className}`}>
      <div className="w-12 h-12 rounded-full bg-[rgba(239,68,68,0.1)] flex items-center justify-center mb-4 text-dm-danger">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
      </div>
      <p className="text-dm-text-secondary text-sm font-sans mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-dm-info text-xs font-semibold font-sans hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-dm-info focus-visible:ring-offset-2 focus-visible:ring-offset-dm-surface-1 rounded"
        >
          Retry
        </button>
      )}
    </div>
  );
}
