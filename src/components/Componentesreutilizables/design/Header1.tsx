import React from 'react';

interface Header1Props {
  title: string;
  subtitle?: string;
  variant?: 'simple' | 'centered' | 'withDivider' | 'withBackground';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

const variantStyles = {
  simple: '',
  centered: 'text-center',
  withDivider: 'border-b border-slate-200 pb-4',
  withBackground: 'bg-slate-50 p-6 rounded-lg'
};

const sizeStyles = {
  sm: {
    title: 'text-xl',
    subtitle: 'text-sm'
  },
  md: {
    title: 'text-2xl',
    subtitle: 'text-base'
  },
  lg: {
    title: 'text-3xl',
    subtitle: 'text-lg'
  }
};

const colorSchemeStyles = {
  blue: {
    title: 'text-blue-800',
    subtitle: 'text-blue-600'
  },
  green: {
    title: 'text-green-800',
    subtitle: 'text-green-600'
  },
  red: {
    title: 'text-red-800',
    subtitle: 'text-red-600'
  },
  yellow: {
    title: 'text-yellow-800',
    subtitle: 'text-yellow-600'
  },
  gray: {
    title: 'text-gray-800',
    subtitle: 'text-gray-600'
  }
};

export const Header1: React.FC<Header1Props> = ({
  title,
  subtitle,
  variant = 'simple',
  size = 'md',
  colorScheme = 'gray',
  className = ''
}) => {
  return (
    <header className={`
      ${variantStyles[variant]}
      ${className}
    `}>
      <h1 className={`
        font-bold
        ${sizeStyles[size].title}
        ${colorSchemeStyles[colorScheme].title}
      `}>
        {title}
      </h1>
      {subtitle && (
        <p className={`
          mt-2
          ${sizeStyles[size].subtitle}
          ${colorSchemeStyles[colorScheme].subtitle}
        `}>
          {subtitle}
        </p>
      )}
    </header>
  );
};