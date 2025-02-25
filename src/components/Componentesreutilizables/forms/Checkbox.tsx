import React, { forwardRef } from 'react';
import { Check, Minus } from 'lucide-react';
import { CheckboxProps } from './types';

const variantStyles = {
  basic: 'border-2',
  bordered: 'border-2 p-4 rounded-lg',
  card: 'border-2 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow'
};

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    label,
    description,
    variant = 'basic',
    size = 'md',
    isChecked,
    isIndeterminate,
    isDisabled = false,
    className = '',
    ...props
  }, ref) => {
    const containerStyles = variant !== 'basic' ? variantStyles[variant] : '';

    return (
      <label className={`
        inline-flex items-start gap-3 cursor-pointer
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${containerStyles}
        ${className}
      `}>
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only"
            checked={isChecked}
            disabled={isDisabled}
            {...props}
          />
          <div className={`
            ${sizeStyles[size]}
            flex items-center justify-center
            rounded border-2 border-gray-300
            ${isChecked || isIndeterminate ? 'bg-blue-500 border-blue-500' : 'bg-white'}
            ${!isDisabled && 'hover:border-blue-500'}
            transition-colors
          `}>
            {isChecked && <Check className="text-white" size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />}
            {isIndeterminate && <Minus className="text-white" size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />}
          </div>
        </div>
        {(label || description) && (
          <div>
            {label && <div className="text-sm font-medium text-gray-700">{label}</div>}
            {description && <div className="text-sm text-gray-500">{description}</div>}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';