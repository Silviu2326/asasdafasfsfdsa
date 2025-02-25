import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

const variantStyles = {
  solid: {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    red: 'bg-red-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    gray: 'bg-gray-500 text-white'
  },
  outline: {
    blue: 'border border-blue-500 text-blue-600',
    green: 'border border-green-500 text-green-600',
    red: 'border border-red-500 text-red-600',
    yellow: 'border border-yellow-500 text-yellow-600',
    gray: 'border border-gray-500 text-gray-600'
  },
  subtle: {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    gray: 'bg-gray-50 text-gray-600'
  }
};

const sizeStyles = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5'
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  colorScheme = 'gray',
  className = ''
}) => {
  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-medium rounded-full
        ${variantStyles[variant][colorScheme]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};