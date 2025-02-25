import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { SelectProps } from './types';

const variantStyles = {
  outline: 'border-2 bg-transparent focus:border-blue-500',
  filled: 'border-0 bg-gray-100 focus:bg-gray-50',
  flushed: 'border-0 border-b-2 rounded-none focus:border-blue-500',
  unstyled: 'border-0 p-0 focus:ring-0'
};

const sizeStyles = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg'
};

export const SelectInput = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    label,
    error,
    helperText,
    options,
    variant = 'outline',
    size = 'md',
    isFullWidth = false,
    isRequired = false,
    isDisabled = false,
    className = '',
    ...props
  }, ref) => {
    return (
      <div className={`${isFullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              ${variantStyles[variant]}
              ${sizeStyles[size]}
              ${error ? 'border-red-500 focus:border-red-500' : ''}
              appearance-none w-full rounded-md
              border-gray-300 focus:ring-2 focus:ring-blue-500/20
              disabled:opacity-50 disabled:cursor-not-allowed
              ${className}
            `}
            disabled={isDisabled}
            required={isRequired}
            {...props}
          >
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

SelectInput.displayName = 'SelectInput';