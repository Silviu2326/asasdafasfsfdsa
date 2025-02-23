import React from 'react';
import { BaseButtonProps } from './types';

const variantStyles = {
  solid: {
    blue: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    green: 'bg-green-100 text-green-700 hover:bg-green-200',
    red: 'bg-red-100 text-red-700 hover:bg-red-200',
    yellow: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    gray: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  },
  outline: {
    blue: 'border border-blue-200 text-blue-600 hover:bg-blue-50',
    green: 'border border-green-200 text-green-600 hover:bg-green-50',
    red: 'border border-red-200 text-red-600 hover:bg-red-50',
    yellow: 'border border-yellow-200 text-yellow-600 hover:bg-yellow-50',
    gray: 'border border-gray-200 text-gray-600 hover:bg-gray-50'
  },
  ghost: {
    blue: 'text-blue-600 hover:bg-blue-50',
    green: 'text-green-600 hover:bg-green-50',
    red: 'text-red-600 hover:bg-red-50',
    yellow: 'text-yellow-600 hover:bg-yellow-50',
    gray: 'text-gray-600 hover:bg-gray-50'
  },
  link: {
    blue: 'text-blue-600 hover:underline',
    green: 'text-green-600 hover:underline',
    red: 'text-red-600 hover:underline',
    yellow: 'text-yellow-600 hover:underline',
    gray: 'text-gray-600 hover:underline'
  }
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

// Change the export style
export const SecondaryButton: React.FC<BaseButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  colorScheme = 'gray',
  isFullWidth = false,
  isDisabled = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`
        ${variantStyles[variant][colorScheme]}
        ${sizeStyles[size]}
        ${isFullWidth ? 'w-full' : ''}
        rounded-md font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${colorScheme}-200
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