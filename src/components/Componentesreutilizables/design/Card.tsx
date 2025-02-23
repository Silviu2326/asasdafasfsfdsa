import React from 'react';
import { CardProps } from './types';

const variantStyles = {
  default: 'bg-white',
  elevated: 'bg-white shadow-lg',
  outlined: 'border-2 border-gray-200',
  filled: 'bg-gray-50'
};

const sizeStyles = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6'
};

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  header,
  footer,
  image,
  imagePosition = 'top',
  isHoverable = false,
  isClickable = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-lg
        ${isHoverable ? 'hover:shadow-lg transition-shadow duration-200' : ''}
        ${isClickable ? 'cursor-pointer active:scale-95 transition-transform duration-200' : ''}
        ${className}
      `}
      {...props}
    >
      {imagePosition === 'top' && image && (
        <div className="rounded-t-lg overflow-hidden -mt-4 -mx-4 mb-4">
          <img src={image} alt="" className="w-full h-48 object-cover" />
        </div>
      )}

      {header && (
        <div className="mb-4 pb-4 border-b">
          {header}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-4 pt-4 border-t">
          {footer}
        </div>
      )}

      {imagePosition === 'bottom' && image && (
        <div className="rounded-b-lg overflow-hidden -mb-4 -mx-4 mt-4">
          <img src={image} alt="" className="w-full h-48 object-cover" />
        </div>
      )}
    </div>
  );
};