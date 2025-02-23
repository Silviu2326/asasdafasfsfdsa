import React from 'react';
import { Loader2 } from 'lucide-react';
import { SpinnerProps } from './types';

const variantStyles = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500'
};

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

const labelSizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
};

const labelPlacementStyles = {
  top: 'flex-col',
  right: 'flex-row',
  bottom: 'flex-col-reverse',
  left: 'flex-row-reverse'
};

const animationStyles = {
  border: 'animate-spin',
  grow: 'animate-ping',
  pulse: 'animate-pulse',
  dots: 'animate-bounce'
};

export const Spinner: React.FC<SpinnerProps> = ({
  label,
  variant = 'info',
  size = 'md',
  labelPlacement = 'right',
  animation = 'border',
  className = ''
}) => {
  return (
    <div className={`
      inline-flex items-center gap-2
      ${labelPlacementStyles[labelPlacement]}
      ${className}
    `}>
      <div className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${animationStyles[animation]}
      `}>
        <Loader2 className="w-full h-full" />
      </div>
      {label && (
        <span className={`
          text-gray-700 font-medium
          ${labelSizeStyles[size]}
        `}>
          {label}
        </span>
      )}
    </div>
  );
};