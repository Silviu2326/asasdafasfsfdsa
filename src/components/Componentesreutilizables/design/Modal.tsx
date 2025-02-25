import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ModalProps } from './types';

const variantStyles = {
  default: 'bg-white',
  elevated: 'bg-white shadow-xl',
  outlined: 'bg-white border-2 border-gray-200',
  filled: 'bg-gray-50'
};

const sizeStyles = {
  sm: 'max-w-md p-4',
  md: 'max-w-lg p-6',
  lg: 'max-w-2xl p-8'
};

const positionStyles = {
  center: 'items-center',
  top: 'items-start pt-16',
  bottom: 'items-end pb-16'
};

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  description,
  variant = 'default',
  size = 'md',
  position = 'center',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = ''
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (isOpen && closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal Content */}
      <div className={`
        relative flex justify-center min-h-full p-4
        ${positionStyles[position]}
      `}>
        <div className={`
          relative w-full
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          rounded-lg
          ${className}
        `}>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X />
          </button>

          {title && (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              {description && (
                <p className="mt-2 text-sm text-gray-500">{description}</p>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};