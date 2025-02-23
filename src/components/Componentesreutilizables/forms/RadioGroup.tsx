import React from 'react';
import { RadioGroupProps } from './types';

const variantStyles = {
  basic: '',
  bordered: 'border-2 p-4 rounded-lg',
  card: 'border-2 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow'
};

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  variant = 'basic',
  size = 'md',
  direction = 'vertical',
  isDisabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`flex ${direction === 'vertical' ? 'flex-col gap-3' : 'flex-row gap-6'}`}>
      {options.map((option) => {
        const containerStyles = variant !== 'basic' ? variantStyles[variant] : '';
        const isChecked = value === option.value;

        return (
          <label
            key={option.value}
            className={`
              inline-flex items-start gap-3 cursor-pointer
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${containerStyles}
            `}
          >
            <div className="relative flex items-center">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={handleChange}
                disabled={isDisabled}
                className="sr-only"
              />
              <div className={`
                ${sizeStyles[size]}
                rounded-full border-2 border-gray-300
                ${isChecked ? 'border-blue-500' : ''}
                ${!isDisabled && 'hover:border-blue-500'}
                transition-colors
              `}>
                {isChecked && (
                  <div className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-2.5 h-2.5' : 'w-3 h-3'}
                    rounded-full bg-blue-500
                  `} />
                )}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700">{option.label}</div>
              {option.description && (
                <div className="text-sm text-gray-500">{option.description}</div>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
};