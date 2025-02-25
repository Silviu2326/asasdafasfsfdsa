import React from 'react';
import { Loader } from 'lucide-react';
import { BaseButtonProps } from './types';

interface LoadingButtonProps extends BaseButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  spinnerPlacement?: 'left' | 'right';
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

const spinnerSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5'
};

// Change the export style
export const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  isLoading = false,
  loadingText,
  spinnerPlacement = 'left',
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
        inline-flex items-center justify-center
        ${sizeStyles[size]}
        ${isFullWidth ? 'w-full' : ''}
        rounded-md font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={isLoading || isDisabled}
      {...props}
    >
      {isLoading && spinnerPlacement === 'left' && (
        <Loader className={`${spinnerSizes[size]} animate-spin mr-2`} />
      )}
      {isLoading ? loadingText || children : children}
      {isLoading && spinnerPlacement === 'right' && (
        <Loader className={`${spinnerSizes[size]} animate-spin ml-2`} />
      )}
    </button>
  );

};