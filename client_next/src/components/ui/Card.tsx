import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`rounded-xl ${hover ? 'transition-colors duration-150 hover:border-[rgba(226,226,226,0.18)]' : ''} ${className}`}
      style={{
        background: 'var(--bg-surface)',
        border: '0.5px solid var(--border)',
      }}
    >
      {children}
    </div>
  );
}
