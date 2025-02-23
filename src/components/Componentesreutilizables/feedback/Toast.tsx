import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';
import { ToastProps } from './types';

const variantStyles = {
  info: {
    container: 'bg-blue-500 text-white',
    icon: 'text-white'
  },
  success: {
    container: 'bg-green-500 text-white',
    icon: 'text-white'
  },
  warning: {
    container: 'bg-yellow-500 text-white',
    icon: 'text-white'
  },
  error: {
    container: 'bg-red-500 text-white',
    icon: 'text-white'
  }
};

const sizeStyles = {
  sm: 'p-2 text-sm',
  md: 'p-3 text-base',
  lg: 'p-4 text-lg'
};

const positionStyles = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
};

const defaultIcons = {
  info: <AlertCircle />,
  success: <CheckCircle />,
  warning: <AlertTriangle />,
  error: <XCircle />
};

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  size = 'md',
  position = 'top-right',
  duration = 3000,
  onClose,
  className = ''
}) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`
      fixed ${positionStyles[position]}
      min-w-[200px] max-w-sm
      rounded-lg shadow-lg
      animate-slide-in
      ${variantStyles[variant].container}
      ${sizeStyles[size]}
      ${className}
    `}>
      <div className="flex items-center gap-2">
        <div className={variantStyles[variant].icon}>
          {defaultIcons[variant]}
        </div>
        <div className="flex-1">{message}</div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white"
          >
            <X size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />
          </button>
        )}
      </div>
    </div>
  );
};