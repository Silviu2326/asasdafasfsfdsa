import React from 'react';
import { DividerProps } from './types';

const variantStyles = {
  default: 'bg-gray-200',
  elevated: 'bg-gray-300 shadow-sm',
  outlined: 'border-t border-gray-200 bg-transparent',
  filled: 'bg-gray-100'
};

const thicknessStyles = {
  thin: 'border-t',
  medium: 'h-px',
  thick: 'h-0.5'
};

const labelPositionStyles = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end'
};

export const Divider: React.FC<DividerProps> = ({
  variant = 'default',
  orientation = 'horizontal',
  thickness = 'medium',
  label,
  labelPosition = 'center',
  className = ''
}) => {
  if (orientation === 'vertical') {
    return (
      <div className={`
        inline-block h-full w-px
        ${variantStyles[variant]}
        ${className}
      `} />
    );
  }

  if (label) {
    return (
      <div className={`flex items-center ${labelPositionStyles[labelPosition]}`}>
        <div className={`
          flex-1
          ${variantStyles[variant]}
          ${thicknessStyles[thickness]}
          ${className}
        `} />
        <span className="px-3 text-sm text-gray-500">{label}</span>
        <div className={`
          flex-1
          ${variantStyles[variant]}
          ${thicknessStyles[thickness]}
          ${className}
        `} />
      </div>
    );
  }

  return (
    <div className={`
      ${variantStyles[variant]}
      ${thicknessStyles[thickness]}
      ${className}
    `} />
  );
};