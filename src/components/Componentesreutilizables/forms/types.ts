import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  variant?: 'basic' | 'bordered' | 'card';
  size?: 'sm' | 'md' | 'lg';
  isChecked?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: Array<{ value: string; label: string; description?: string }>;
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'basic' | 'bordered' | 'card';
  size?: 'sm' | 'md' | 'lg';
  direction?: 'horizontal' | 'vertical';
  isDisabled?: boolean;
}