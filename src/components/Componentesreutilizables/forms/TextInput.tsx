import React, { forwardRef } from 'react';
import { BaseInputProps } from './types';

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

export const TextInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({
    label,
    error,
    helperText,
    variant = 'outline',
    size = 'md',
    isFullWidth = false,
    isRequired = false,
    isDisabled = false,
    isReadOnly = false,
    leftIcon,
    rightIcon,
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
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              ${variantStyles[variant]}
              ${sizeStyles[size]}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${error ? 'border-red-500 focus:border-red-500' : ''}
              ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
              w-full rounded-md
              border-gray-300 focus:ring-2 focus:ring-blue-500/20
              disabled:opacity-50 disabled:cursor-not-allowed
              ${className}
            `}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
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

TextInput.displayName = 'TextInput';