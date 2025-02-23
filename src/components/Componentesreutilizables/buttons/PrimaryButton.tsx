import React from 'react';
import { BaseButtonProps } from './types';

const variantStyles = {
  solid: {
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
    green: 'bg-green-500 hover:bg-green-600 text-white',
    red: 'bg-red-500 hover:bg-red-600 text-white',
    yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    gray: 'bg-gray-500 hover:bg-gray-600 text-white'
  },
  outline: {
    blue: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
    green: 'border-2 border-green-500 text-green-500 hover:bg-green-50',
    red: 'border-2 border-red-500 text-red-500 hover:bg-red-50',
    yellow: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50',
    gray: 'border-2 border-gray-500 text-gray-500 hover:bg-gray-50'
  },
  ghost: {
    blue: 'text-blue-500 hover:bg-blue-50',
    green: 'text-green-500 hover:bg-green-50',
    red: 'text-red-500 hover:bg-red-50',
    yellow: 'text-yellow-500 hover:bg-yellow-50',
    gray: 'text-gray-500 hover:bg-gray-50'
  },
  link: {
    blue: 'text-blue-500 hover:underline',
    green: 'text-green-500 hover:underline',
    red: 'text-red-500 hover:underline',
    yellow: 'text-yellow-500 hover:underline',
    gray: 'text-gray-500 hover:underline'
  }
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

// Change the export style
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
  return (
    <button
      className={`
        ${variantStyles[variant][colorScheme]}
        ${sizeStyles[size]}
        ${isFullWidth ? 'w-full' : ''}
        rounded-md font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${colorScheme}-500
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