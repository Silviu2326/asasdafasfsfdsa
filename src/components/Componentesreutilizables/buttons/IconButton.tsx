import React from 'react';
import { BaseButtonProps } from './types';

interface IconButtonProps extends BaseButtonProps {
  icon: React.ReactElement;
  label?: string;
  placement?: 'left' | 'right';
}

const sizeStyles = {
  sm: 'p-1.5 text-sm',
  md: 'p-2 text-base',
  lg: 'p-3 text-lg'
};

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

// Change the export style
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  placement = 'left',
  variant = 'solid',
  size = 'md',
  colorScheme = 'gray',
  isFullWidth = false,
  isDisabled = false,
  className = '',
  ...props
}) => {
  const Icon = React.cloneElement(icon, {
    className: `${iconSizes[size]} ${label ? (placement === 'left' ? 'mr-2' : 'ml-2') : ''}`
  });

  return (
    <button
      className={`
        inline-flex items-center justify-center
        ${label ? sizeStyles[size] : 'aspect-square ' + sizeStyles[size]}
        ${isFullWidth ? 'w-full' : ''}
        rounded-md font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {placement === 'left' && Icon}
      {label && <span>{label}</span>}
      {placement === 'right' && Icon}
    </button>
  );
};