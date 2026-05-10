import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, React.CSSProperties> = {
  primary:   { background: '#e2e2e2', color: '#080808' },
  secondary: { background: 'transparent', color: '#e2e2e2', border: '0.5px solid rgba(255,255,255,0.07)' },
  ghost:     { background: 'transparent', color: '#666666' },
  danger:    { background: 'rgba(248,113,113,0.08)', color: '#f87171', border: '0.5px solid rgba(248,113,113,0.2)' },
};

const variantHoverClass: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:   'hover:opacity-90',
  secondary: 'hover:border-[rgba(226,226,226,0.18)] hover:text-[#e2e2e2]',
  ghost:     'hover:text-[#e2e2e2] hover:bg-[rgba(226,226,226,0.05)]',
  danger:    'hover:bg-[rgba(248,113,113,0.14)]',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  small:  'px-3 py-1.5 text-sm',
  medium: 'px-5 py-2.5 text-sm',
  large:  'px-8 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'medium',
  className = '',
  style,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${variantHoverClass[variant]} ${sizeClasses[size]} ${className}`}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
