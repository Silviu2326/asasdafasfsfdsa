import React from 'react';
import { ProgressProps } from './types';

const variantStyles = {
  info: {
    bar: 'bg-blue-500',
    track: 'bg-blue-100'
  },
  success: {
    bar: 'bg-green-500',
    track: 'bg-green-100'
  },
  warning: {
    bar: 'bg-yellow-500',
    track: 'bg-yellow-100'
  },
  error: {
    bar: 'bg-red-500',
    track: 'bg-red-100'
  }
};

const thicknessStyles = {
  thin: 'h-1',
  medium: 'h-2',
  thick: 'h-4'
};

const animationStyles = {
  none: '',
  stripe: 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:30px_30px] animate-[move-bg_1s_linear_infinite]',
  pulse: 'animate-pulse'
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'info',
  size = 'md',
  showValue = false,
  animation = 'none',
  thickness = 'medium',
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={className}>
      {showValue && (
        <div className="mb-1 text-sm font-medium text-gray-700">
          {Math.round(percentage)}%
        </div>
      )}
      <div className={`
        w-full rounded-full overflow-hidden
        ${variantStyles[variant].track}
        ${thicknessStyles[thickness]}
      `}>
        <div
          className={`
            rounded-full transition-all duration-300
            ${variantStyles[variant].bar}
            ${animationStyles[animation]}
            ${thicknessStyles[thickness]}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};