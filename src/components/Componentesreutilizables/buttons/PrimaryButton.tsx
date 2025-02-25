import React from 'react';
import { BaseButtonProps } from './types';

const variantStyles = {
  solid: {
    blue: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    green: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
    red: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500',
    gray: 'bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500',
    indigo: 'bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-500'
  },
  outline: {
    blue: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500',
    green: 'border-2 border-green-500 text-green-500 hover:bg-green-50 focus:ring-green-500',
    red: 'border-2 border-red-500 text-red-500 hover:bg-red-50 focus:ring-red-500',
    yellow: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-500',
    gray: 'border-2 border-gray-500 text-gray-500 hover:bg-gray-50 focus:ring-gray-500',
    indigo: 'border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 focus:ring-indigo-500'
  },
  ghost: {
    blue: 'text-blue-500 hover:bg-blue-50 focus:ring-blue-500',
    green: 'text-green-500 hover:bg-green-50 focus:ring-green-500',
    red: 'text-red-500 hover:bg-red-50 focus:ring-red-500',
    yellow: 'text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-500',
    gray: 'text-gray-500 hover:bg-gray-50 focus:ring-gray-500',
    indigo: 'text-indigo-500 hover:bg-indigo-50 focus:ring-indigo-500'
  },
  link: {
    blue: 'text-blue-500 hover:underline focus:ring-blue-500',
    green: 'text-green-500 hover:underline focus:ring-green-500',
    red: 'text-red-500 hover:underline focus:ring-red-500',
    yellow: 'text-yellow-500 hover:underline focus:ring-yellow-500',
    gray: 'text-gray-500 hover:underline focus:ring-gray-500',
    indigo: 'text-indigo-500 hover:underline focus:ring-indigo-500'
  }
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

export const PrimaryButton: React.FC<BaseButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  colorScheme = 'blue',
  isFullWidth = false,
  isDisabled = false,
  className = '',
  ...props
}) => {
  const variantStyle = variantStyles[variant]?.[colorScheme] || variantStyles.solid.blue;
  const sizeStyle = sizeStyles[size] || sizeStyles.md;

  return (
    <button
      className={`
        ${variantStyle}
        ${sizeStyle}
        ${isFullWidth ? 'w-full' : ''}
        rounded-md font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};