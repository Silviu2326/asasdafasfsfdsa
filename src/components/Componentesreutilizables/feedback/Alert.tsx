import React from 'react';
import { AlertCircle, CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';
import { AlertProps } from './types';

const variantStyles = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-500',
    title: 'text-blue-800',
    description: 'text-blue-700'
  },
  success: {
    container: 'bg-green-50 border-green-200',
    icon: 'text-green-500',
    title: 'text-green-800',
    description: 'text-green-700'
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-500',
    title: 'text-yellow-800',
    description: 'text-yellow-700'
  },
  error: {
    container: 'bg-red-50 border-red-200',
    icon: 'text-red-500',
    title: 'text-red-800',
    description: 'text-red-700'
  }
};

const sizeStyles = {
  sm: 'p-2 text-sm',
  md: 'p-4 text-base',
  lg: 'p-6 text-lg'
};

const defaultIcons = {
  info: <AlertCircle />,
  success: <CheckCircle />,
  warning: <AlertTriangle />,
  error: <XCircle />
};

export const Alert: React.FC<AlertProps> = ({
  title,
  description,
  variant = 'info',
  size = 'md',
  icon,
  isClosable = false,
  onClose,
  className = ''
}) => {
  const styles = variantStyles[variant];

  return (
    <div className={`
      flex items-start gap-3 rounded-lg border
      ${styles.container}
      ${sizeStyles[size]}
      ${className}
    `}>
      <div className={styles.icon}>
        {icon || defaultIcons[variant]}
      </div>
      
      <div className="flex-1">
        {title && (
          <h4 className={`font-medium ${styles.title}`}>
            {title}
          </h4>
        )}
        {description && (
          <div className={`mt-1 ${styles.description}`}>
            {description}
          </div>
        )}
      </div>

      {isClosable && (
        <button
          onClick={onClose}
          className={`${styles.icon} hover:opacity-70`}
        >
          <X size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />
        </button>
      )}
    </div>
  );
};